import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../assets/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser , setAuthUser ] = useState(null);
    const [role, setRole] = useState('работник');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthUser (user);
                const userDoc = await getDoc(doc(firestore, 'users', user.email));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setRole(userData.role || 'работник');
                }
            } else {
                setAuthUser (null);
                setRole('работник');
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
        <AuthContext.Provider value={{ authUser , role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
