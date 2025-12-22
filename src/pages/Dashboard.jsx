

import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Welcome to Your Dashboard</h1>
            <p className="theme-text-light mb-4">
                Hello, {user?.displayName || 'User'}! This is your personalized control panel. 
                You can manage your tuition posts, applications, payments, and profile from here.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">My Posts</h2>
                    <p className="text-sm theme-text-light">Manage your tuition requirements.</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">My Payments</h2>
                    <p className="text-sm theme-text-light">Track your financial history.</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p className="text-sm theme-text-light">Update your personal information.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;