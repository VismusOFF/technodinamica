import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../assets/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser , setAuthUser ] = useState(null);
    const [role, setRole] = useState('работник');

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
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser , role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
