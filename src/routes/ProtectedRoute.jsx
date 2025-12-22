

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import * as jwtDecodeModule from 'jwt-decode'; 
const jwtDecode = (token) => {
    let decoder = null;

    if (typeof jwtDecodeModule.jwtDecode === 'function') {
        decoder = jwtDecodeModule.jwtDecode; 
    }
    else if (typeof jwtDecodeModule.default === 'function') {
        decoder = jwtDecodeModule.default;
    }
  
    else if (typeof jwtDecodeModule === 'function') {
        decoder = jwtDecodeModule;
    }

    if (typeof decoder !== 'function') {
        
        console.error("JWT-Decode Final Check Failed. Imported module:", jwtDecodeModule);
        throw new TypeError("decodeFunction is not a function. FINAL CHECK FAILED. Ensure 'jwt-decode' is installed.");
    }
    
    return decoder(token);
}


const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen theme-bg-dark text-white flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            </div>
        );
    }

    if (!user ) {
        return <Navigate to="/login" replace />;
    }

    const token = localStorage.getItem('access-token');
    if (!token) {

        return <Navigate to="/login" replace />; 
    }
    
    let userRole = null;
    try {
        const decoded = jwtDecode(token); 
        userRole = decoded?.role?.toLowerCase();
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        // If token is invalid/corrupted, force logout/redirect
        return <Navigate to="/login" replace />;
    }

    const targetPath = `/dashboard/${userRole}`;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return (
            <div className="p-8 theme-bg-dark text-red-400 min-h-screen">
                <h1>403 Forbidden</h1>
                <p>You do not have permission to access this page.</p>
            </div>
        );
    }
    
    if (window.location.pathname === '/dashboard' || window.location.pathname === '/dashboard/') {
        return <Navigate to={targetPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;