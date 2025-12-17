// src/pages/dashboard/AppliedTutors.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchApplications = async () => {
        try {
            const res = await fetch(`http://localhost:3000/applied-tutors/${user.email}`);
            const data = await res.json();
            setApplications(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchApplications();
    }, [user]);

    const handleReject = async (id) => {
        const res = await fetch(`http://localhost:3000/application-reject/${id}`, { method: 'PATCH' });
        if (res.ok) {
            Swal.fire('Rejected', 'Application has been rejected.', 'info');
            fetchApplications();
        }
    };

    if (loading) return <div className="text-center py-10"><span className="loading loading-spinner text-emerald-400"></span></div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8 theme-accent-text border-b-2 border-emerald-400 pb-2">Applied Tutors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map(app => (
                    <div key={app._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={app.tutorPhoto} className="w-16 h-16 rounded-full border-2 border-emerald-400" alt="" />
                            <div>
                                <h2 className="text-xl font-bold text-white">{app.tutorName}</h2>
                                <p className="text-emerald-400 text-sm">{app.tutorUniversity}</p>
                            </div>
                        </div>
                        <div className="text-gray-300 text-sm space-y-2 mb-6">
                            <p><strong>Salary:</strong> {app.expectedSalary} BDT</p>
                            <p><strong>Status:</strong> <span className="badge badge-warning">{app.status}</span></p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => navigate('/dashboard/student/payment', { state: { application: app } })}
                                className="btn btn-sm bg-emerald-500 text-black flex-1 border-none"
                            >Approve & Pay</button>
                            <button onClick={() => handleReject(app._id)} className="btn btn-sm btn-outline btn-error flex-1">Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedTutors;