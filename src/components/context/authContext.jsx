import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../assets/firebase'; // Импортируйте ваш файл конфигурации Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../assets/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser , setAuthUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Пользователь:", user); // Проверяем, кто пользователь
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.email));
                console.log("Документ пользователя существует:", userDoc.exists()); // Проверяем, существует ли документ
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setAuthUser ({
                        email: user.email,
                        fullName: userData.fullName || '',
                        phoneNumber: userData.phoneNumber || '',
                        role: userData.role || 'работник'
                    });
                } else {
                    // Если пользователь не найден в Firestore, создаем его с базовыми данными
                    setAuthUser ({
                        email: user.email,
                        fullName: '',
                        phoneNumber: '',
                        role: 'работник'
                    });
                }
            } else {
                setAuthUser (null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <Box 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <AuthContext.Provider value={{ authUser  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
