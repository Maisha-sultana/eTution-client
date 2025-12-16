// src/routes/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// 👇️ ফিক্স: Wildcard Import ব্যবহার করা হলো
import * as jwtDecodeModule from 'jwt-decode'; 

// 👇️ ULTIMATE FIX: Wrapper Function ব্যবহার করে মডিউল অবজেক্ট থেকে ফাংশনটি নিরাপদে খুঁজে বের করা হলো।
const jwtDecode = (token) => {
    let decoder = null;

    // 1. Named Export (jwtDecode) প্রপার্টিটি খুঁজুন (v4+)
    if (typeof jwtDecodeModule.jwtDecode === 'function') {
        decoder = jwtDecodeModule.jwtDecode; 
    }
    // 2. যদি না পাওয়া যায়, তবে Default Export (default) খুঁজুন (v3.0.0-)
    else if (typeof jwtDecodeModule.default === 'function') {
        decoder = jwtDecodeModule.default;
    }
    // 3. যদি তাও না হয়, তবে মডিউল অবজেক্টটি নিজেই ফাংশন কিনা দেখুন
    else if (typeof jwtDecodeModule === 'function') {
        decoder = jwtDecodeModule;
    }

    if (typeof decoder !== 'function') {
        // যদি সমস্ত চেক ব্যর্থ হয়, তবে ইনস্টলেশন সমস্যা নিশ্চিত।
        console.error("JWT-Decode Final Check Failed. Imported module:", jwtDecodeModule);
        throw new TypeError("decodeFunction is not a function. FINAL CHECK FAILED. Ensure 'jwt-decode' is installed.");
    }
    
    return decoder(token);
}


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
        // If logged in via Firebase but token is missing (Race Condition), redirect to login
        return <Navigate to="/login" replace />; 
    }
    
    let userRole = null;
    try {
        const decoded = jwtDecode(token); // jwtDecode is now the robust wrapper function
        userRole = decoded?.role?.toLowerCase();
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        // If token is invalid/corrupted, force logout/redirect
        return <Navigate to="/login" replace />;
    }

    // Determine the target route based on the role
    const targetPath = `/dashboard/${userRole}`;

    // 4. Role Authorization Check (if allowedRoles prop is provided)
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

    // 6. Render the nested routes (user is authenticated and authorized)
    return <Outlet />;
};

export default ProtectedRoute;