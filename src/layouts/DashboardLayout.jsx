

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import { useAuth } from '../contexts/AuthContext';
import * as jwtDecodeModule from 'jwt-decode'; 


const jwtDecode = (token) => {
    let decoder = null;
    if (typeof jwtDecodeModule.jwtDecode === 'function') {
        decoder = jwtDecodeModule.jwtDecode; 
    } else if (typeof jwtDecodeModule.default === 'function') {
        decoder = jwtDecodeModule.default;
    } else if (typeof jwtDecodeModule === 'function') {
        decoder = jwtDecodeModule;
    }
    return decoder ? decoder(token) : null;
}

const DashboardSidebar = ({ userRole }) => {
    let links = [];
    const basePath = `/dashboard/${userRole}`;

    if (userRole === 'student') {
        links = [
            { path: basePath, name: 'Overview', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            { path: `${basePath}/post-tuition`, name: 'Post New Tuition', icon: 'M12 4v16m8-8H4' },
            { path: `${basePath}/my-tuitions`, name: 'My Tuition Posts', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { path: `${basePath}/applied-tutors`, name: 'Applied Tutors', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { path: `${basePath}/profile`, name: 'Profile Settings', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    ];
    } 
    else if (userRole === 'tutor') {
      links = [
            { path: basePath, name: 'Overview', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            { path: `${basePath}/profile`, name: 'Profile Settings', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { path: `${basePath}/applications`, name: 'My Applications', icon: 'M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 0h-2m-2 0h-2' },
            { path: `${basePath}/ongoing`, name: 'Ongoing Tuitions', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { path: `${basePath}/revenue`, name: 'Revenue History', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        ];
    }
    else if (userRole === 'admin') {
       links = [
        { path: basePath, name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { path: `${basePath}/users`, name: 'User Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197' },
        { path: `${basePath}/tuitions`, name: 'Tuition Management', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    ];
    }
    
   
    const activeClasses = "bg-emerald-600 font-bold border-r-4 border-yellow-400 text-white"; 
    const defaultClasses = "hover:bg-gray-700/80 transition duration-150 text-gray-300";

    return (
        <ul className="menu p-4 w-64 min-h-full bg-gray-800 shadow-lg"> 
            <h3 className="text-xl font-bold theme-accent-text mb-4 capitalize">{userRole} Panel</h3>
            <div className="divider my-0 mb-2 bg-gray-700 h-[1px]"></div>
            
            {links.map((link) => (
                <li key={link.name} className='mb-1'>
                    <NavLink
                        to={link.path}
                        end={link.name === "Overview"}
                        className={({ isActive }) => `${isActive ? activeClasses : defaultClasses}`}
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

    const token = localStorage.getItem('access-token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded?.role?.toLowerCase() || 'student';
        } catch (error) {
            console.error("Layout error:", error);
        }
    }
    
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
            <div className="flex-grow flex">
                <aside>
                    <DashboardSidebar userRole={userRole} />
                </aside>
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