// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col theme-bg-dark"> 
            <Navbar />
            
            {/* The Outlet renders the nested route content (Home, Login, etc.) */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default PublicLayout;