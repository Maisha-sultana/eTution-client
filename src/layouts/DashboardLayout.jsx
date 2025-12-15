// src/layouts/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import Footer from '../components/Footer'; // Import is correct

const DashboardLayout = () => {
    return (
        // MODIFIED: Added flex flex-col to the main container
        <div className="min-h-screen theme-bg-dark text-white flex flex-col"> 
            <Navbar /> 
            
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto py-8 px-4"> 
                    
                    <main className="p-4 bg-gray-800 rounded-lg shadow-2xl">
                        <Outlet /> {/* Renders the specific Dashboard route (Profile, Settings, etc.) */}
                    </main>
                </div>
            </div>

            <Footer/> 
        </div>
    );
};

export default DashboardLayout;