// src/layouts/DashboardLayout.jsx (MODIFIED for Sidebar color and Active Text)

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import * as jwtDecodeModule from 'jwt-decode'; 

// ULTIMATE FIX: Wrapper Function ব্যবহার করে মডিউল অবজেক্ট থেকে ফাংশনটি নিরাপদে খুঁজে বের করা হলো।
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
        // Fallback or error handling for the unlikely scenario
        return null;
    }
    
    return decoder(token);
}


// Helper function to render Dashboard Sidebar Links
const DashboardSidebar = ({ userRole }) => {
    let links = [];
    const basePath = `/dashboard/${userRole}`;

    // --- Links Definition (same as before) ---
    if (userRole === 'student') {
        links = [
            { path: basePath, name: 'Dashboard Overview', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            { path: `${basePath}/post-tuition`, name: 'Post New Tuition', icon: 'M12 4v16m8-8H4' },
            { path: `${basePath}/my-tuitions`, name: 'My Tuition Posts', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { path: `${basePath}/applied-tutors`, name: 'Applied Tutors', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        ];
    } 
    else if (userRole === 'tutor') {
        links = [
            { path: basePath, name: 'Tutor Dashboard', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            { path: `${basePath}/applications`, name: 'My Applications', icon: 'M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 0h-2m-2 0h-2' },
        ];
    }
    else if (userRole === 'admin') {
         links = [
            { path: basePath, name: 'Admin Panel', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
        ];
    }
    
    links.push(
        { path: `${basePath}/payments`, name: 'Payments', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2l.9 1.83.6.3L12 21l3-6h2a2 2 0 002-2v-2' },
        { path: `${basePath}/profile`, name: 'Profile Settings', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5M8 9a4 4 0 118 0 4 4 0 01-8 0z' }
    );
    // --- End Links Definition ---

    // MODIFIED: 'text-white' is now correctly applied to active state.
    const activeClasses = "bg-emerald-600 font-bold border-r-4 border-yellow-400"; 
    const defaultClasses = "hover:bg-gray-700/80 transition duration-150"; // No text color here

    return (
        // Sidebar background color is bg-gray-800
        <ul className="menu p-4 w-64 min-h-full bg-gray-800 text-base-content shadow-lg"> 
            <h3 className="text-xl font-bold theme-accent-text mb-4 capitalize">{userRole} Panel</h3>
            <div className="divider my-0 mb-2 bg-gray-700 h-[1px]"></div>
            
            {links.map((link) => (
                <li key={link.name} className='mb-1'>
                    <NavLink
                        to={link.path}
                        end={link.name.includes("Overview")}
                        className={({ isActive }) => 
                            // 👇️ FIX: Apply 'text-white' to active, otherwise use gray-300 for inactive
                            `${defaultClasses} ${isActive ? activeClasses + ' text-white' : 'text-gray-300'}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                        </svg>
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};


const DashboardLayout = () => {
    const { user, loading } = useAuth();
    let userRole = 'student';

    // 1. Get role from JWT for dynamic sidebar
    const token = localStorage.getItem('access-token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded?.role?.toLowerCase() || 'student';
        } catch (error) {
            console.error("Layout: Failed to decode token for role.", error);
        }
    }
    
    // If the component is loading, show a simple loading indicator
    if (loading) {
         return (
            <div className="min-h-screen theme-bg-dark text-white flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            </div>
        );
    }


    return (
        <div className="min-h-screen theme-bg-dark text-white flex flex-col"> 
            <Navbar /> 
            
            <div className="flex-grow flex"> {/* Flex container for Sidebar + Content */}
                
                {/* 1. Dashboard Sidebar (Left Panel) */}
                <aside>
                    <DashboardSidebar userRole={userRole} />
                </aside>

                {/* 2. Main Content Area */}
                <main className="flex-grow p-4 lg:p-6 overflow-y-auto"> 
                    <div className="max-w-7xl mx-auto">
                  
                            <Outlet /> 
                       
                    </div>
                </main>
            </div>

           
        </div>
    );
};

export default DashboardLayout;