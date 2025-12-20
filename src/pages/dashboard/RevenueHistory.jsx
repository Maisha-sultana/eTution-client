import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
const RevenueHistory = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/tutor/revenue/${user.email}`)
            .then(res => res.json())
            .then(data => setPayments(data));
    }, [user.email]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Revenue History</h1>
            <div className="stats shadow bg-gray-800 text-white mb-6 w-full">
                <div className="stat">
                    <div className="stat-title text-gray-400">Total Life-time Earnings</div>
                    <div className="stat-value text-emerald-400">{totalRevenue.toLocaleString()} BDT</div>
                </div>
            </div>
            <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
                <table className="table w-full text-white">
                    <thead>
                        <tr className="text-emerald-400 border-b border-gray-700">
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id} className="border-b border-gray-700/50">
                                <td>{new Date(p.date).toLocaleDateString()}</td>
                                <td className="font-semibold text-yellow-400">{p.subject}</td>
                                <td className="text-xs opacity-60 font-mono">{p.transactionId}</td>
                                <td className="text-emerald-400 font-bold">{p.amount} BDT</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default RevenueHistory;