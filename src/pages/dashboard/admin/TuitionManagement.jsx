import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
    const [tuitions, setTuitions] = useState([]);

    const fetchTuitions = () => {
        fetch('https://e-tution-server-nine.vercel.app/admin/all-tuitions')
            .then(res => res.json())
            .then(data => setTuitions(data));
    };

    useEffect(() => { fetchTuitions(); }, []);
const handleStatusUpdate = async (id, newStatus) => {
    const res = await fetch(`https://e-tution-server-nine.vercel.app/admin/tuition-status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
        Swal.fire('Success', `Tuition is now ${newStatus}`, 'success');
        fetchTuitions(); // Refresh list
    }
};

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Tuition Management</h1>
            <div className="overflow-x-auto bg-gray-800 rounded-xl">
                <table className="table w-full text-white">
                    <thead>
                        <tr className="text-emerald-400">
                            <th>Subject</th>
                            <th>Student</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map(t => (
                            <tr key={t._id} className="border-b border-gray-700">
                                <td>{t.subject} <br/><span className="text-xs text-gray-400">{t.location}</span></td>
                                <td>{t.studentEmail}</td>
                                <td>
                                    <span className={`badge ${t.status === 'Approved' ? 'badge-success' : t.status === 'Pending' ? 'badge-warning' : 'badge-error'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                   <button onClick={() => handleStatusUpdate(t._id, 'Approved')} className="btn btn-xs btn-success">Approve</button>
                           <button onClick={() => handleStatusUpdate(t._id, 'Rejected')} className="btn btn-xs btn-error">Reject</button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TuitionManagement;