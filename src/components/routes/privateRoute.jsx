import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { authUser  } = useAuth();
    const role = authUser  ? authUser .role : null; // Получаем роль пользователя

    console.log('authUser :', authUser );
    console.log('role:', role);
    console.log('allowedRoles:', allowedRoles);

    if (!authUser ) {
        return <Navigate to="/signin" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
