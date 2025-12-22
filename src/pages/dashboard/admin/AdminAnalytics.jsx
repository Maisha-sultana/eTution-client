import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminAnalytics = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('https://e-tution-server-nine.vercel.app/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <div className="flex justify-center py-20"><span className="loading loading-spinner text-emerald-400"></span></div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Reports & Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-gray-800 rounded-xl shadow-xl">
                    <div className="stat-title text-gray-400">Total Earnings</div>
                    <div className="stat-value text-emerald-400">{stats.totalEarnings} BDT</div>
                </div>
                <div className="stat bg-gray-800 rounded-xl shadow-xl">
                    <div className="stat-title text-gray-400">Total Users</div>
                    <div className="stat-value text-white">{stats.totalUsers}</div>
                </div>
                <div className="stat bg-gray-800 rounded-xl shadow-xl">
                    <div className="stat-title text-gray-400">Total Tuitions</div>
                    <div className="stat-value text-yellow-400">{stats.totalTuitions}</div>
                </div>
            </div>

            {/* Visual Chart Section */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-10 h-80">
                <h2 className="text-xl font-bold mb-6 text-white">Revenue Analysis</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.transactions}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                        <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminAnalytics;