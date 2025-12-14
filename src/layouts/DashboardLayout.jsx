// src/layouts/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar'; // We'll keep the Navbar for consistency
// import DashboardSidebar from '../components/DashboardSidebar'; // Placeholder for future sidebar

const DashboardLayout = () => {
    return (
        // Full-width layout for the Dashboard
        <div className="min-h-screen theme-bg-dark text-white"> 
            <Navbar /> 
            
            {/* Dashboard Container: Flex structure for future sidebar integration */}
            <div className="flex max-w-7xl mx-auto py-8 px-4">
                {/* <DashboardSidebar /> // Add this later */}
                
                {/* Dashboard Main Content Area */}
                <main className="flex-grow p-4 bg-gray-800 rounded-lg shadow-2xl">
                    <Outlet /> {/* Renders the specific Dashboard route (Profile, Settings, etc.) */}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;