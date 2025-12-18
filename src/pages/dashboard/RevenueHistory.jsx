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
                    <div className="stat-title text-gray-400">Total Earnings</div>
                    <div className="stat-value text-emerald-400">{totalRevenue} BDT</div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full bg-gray-800">
                    <thead><tr className="text-emerald-400"><th>Date</th><th>Transaction ID</th><th>Amount</th></tr></thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id}>
                                <td>{new Date(p.date).toLocaleDateString()}</td>
                                <td className="text-xs">{p.transactionId}</td>
                                <td>{p.amount} BDT</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevenueHistory;