// src/pages/dashboard/MyApplications.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const { user } = useAuth();
    const [apps, setApps] = useState([]);

    const fetchApps = () => {
        fetch(`https://e-tution-server-nine.vercel.app/tutor-applications/${user.email}`)
            .then(res => res.json())
            .then(data => setApps(data));
    };

    useEffect(() => { fetchApps(); }, [user]);

    const handleCancel = (id) => {
        Swal.fire({ title: 'Cancel?', icon: 'warning', showCancelButton: true }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://e-tution-server-nine.vercel.app/application-cancel/${id}`, { method: 'DELETE' });
                if (res.ok) { fetchApps(); Swal.fire('Cancelled'); }
            }
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">My Applications</h1>
            <div className="overflow-x-auto">
                <table className="table w-full bg-gray-800 text-white rounded-lg">
                    <thead><tr className="text-emerald-400"><th>Subject</th><th>Salary</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {apps.map(a => (
                            <tr key={a._id}>
                                <td>{a.subject}</td>
                                <td>{a.expectedSalary} BDT</td>
                                <td><span className={`badge ${a.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>{a.status}</span></td>
                                <td>
                                    {a.status === 'Pending' && <button onClick={() => handleCancel(a._id)} className="btn btn-xs btn-error">Cancel</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;