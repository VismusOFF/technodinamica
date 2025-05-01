import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { authUser , role } = useAuth();

    if (!authUser ) {
        return <Navigate to="/signin" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;