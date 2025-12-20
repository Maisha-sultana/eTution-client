import React, { useEffect, useState } from 'react';

const AdminAnalytics = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <span className="loading loading-spinner text-emerald-400"></span>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Reports & Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stats shadow bg-gray-800 text-white">
                    <div className="stat">
                        <div className="stat-title">Total Earnings</div>
                        <div className="stat-value text-emerald-400">{stats.totalEarnings} BDT</div>
                    </div>
                </div>
                <div className="stats shadow bg-gray-800 text-white">
                    <div className="stat">
                        <div className="stat-title">Registered Users</div>
                        <div className="stat-value">{stats.totalUsers}</div>
                    </div>
                </div>
                <div className="stats shadow bg-gray-800 text-white">
                    <div className="stat">
                        <div className="stat-title">Total Tuitions</div>
                        <div className="stat-value text-yellow-400">{stats.totalTuitions}</div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="overflow-x-auto bg-gray-800 rounded-xl">
                <table className="table w-full text-white">
                    <thead>
                        <tr className="text-emerald-400">
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Student</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.transactions.map(tx => (
                            <tr key={tx._id} className="border-b border-gray-700">
                                <td>{new Date(tx.date).toLocaleDateString()}</td>
                                <td className="text-xs font-mono">{tx.transactionId}</td>
                                <td>{tx.studentEmail}</td>
                                <td className="text-emerald-400 font-bold">{tx.amount} BDT</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAnalytics;