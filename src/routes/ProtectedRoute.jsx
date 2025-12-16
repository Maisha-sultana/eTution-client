// src/routes/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// 👇️ পরিবর্তন করা হয়েছে: Wildcard import ব্যবহার করে SyntaxError ঠিক করা হলো
import * as jwtDecodeModule from 'jwt-decode'; 

// আসল jwtDecode ফাংশনটি বের করে নেওয়া, যাতে এটি LoginPage.jsx এর মতোই কাজ করে
const jwtDecode = jwtDecodeModule.default || jwtDecodeModule;


const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    
    // 1. Show loading screen while checking auth state
    if (loading) {
        return (
            <div className="min-h-screen theme-bg-dark text-white flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            </div>
        );
    }

    // 2. If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. User is logged in, now check the role from JWT
    const token = localStorage.getItem('access-token');
    if (!token) {
        // If logged in via Firebase but token is missing, redirect to login (or force logout)
        return <Navigate to="/login" replace />; 
    }
    
    let userRole = null;
    try {
        const decoded = jwtDecode(token); // <--- এখানে jwtDecode ব্যবহার হচ্ছে
        userRole = decoded?.role?.toLowerCase();
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        // If token is invalid, force logout/redirect
        return <Navigate to="/login" replace />;
    }

    // Determine the target route based on the role
    const targetPath = `/dashboard/${userRole}`;

    // 4. Role Authorization Check
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return (
            <div className="p-8 theme-bg-dark text-red-400 min-h-screen">
                <h1>403 Forbidden</h1>
                <p>You do not have permission to access this page.</p>
            </div>
        );
    }
    
    // 5. If the current route is the generic /dashboard, redirect to the specific role dashboard
    if (window.location.pathname === '/dashboard' || window.location.pathname === '/dashboard/') {
        return <Navigate to={targetPath} replace />;
    }

    // 6. Render the nested routes
    return <Outlet />;
};

export default ProtectedRoute;