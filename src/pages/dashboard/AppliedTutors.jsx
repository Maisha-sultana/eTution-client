// src/pages/dashboard/AppliedTutors.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. স্টুডেন্টের ইমেইল অনুযায়ী আবেদন করা টিউটরদের তালিকা নিয়ে আসা
    const fetchApplications = async () => {
        try {
            const res = await fetch(`https://e-tution-server-nine.vercel.app/applied-tutors/${user.email}`);
            const data = await res.json();
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchApplications();
    }, [user]);

    // ২. পেমেন্ট হ্যান্ডলার (Stripe Checkout Redirect)
    const handleApproveAndPay = async (app) => {
        const paymentData = {
            applicationId: app._id,
            amount: app.expectedSalary,
            tutorName: app.tutorName,
            studentEmail: user.email
        };

        try {
            // ব্যাকএন্ডে চেকআউট সেশন তৈরির রিকোয়েস্ট পাঠানো
            const res = await fetch('https://e-tution-server-nine.vercel.app/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            });

            const data = await res.json();

            if (data.url) {
                // সরাসরি স্ট্রাইপ পেমেন্ট পেজে রিডাইরেক্ট করা
                window.location.href = data.url; 
            } else {
                Swal.fire('Error', 'Failed to initiate payment session.', 'error');
            }
        } catch (error) {
            console.error("Payment Error:", error);
            Swal.fire('Error', 'Connection to payment server failed.', 'error');
        }
    };

    // ৩. রিজেক্ট হ্যান্ডলার
    const handleReject = async (id) => {
        const res = await fetch(`https://e-tution-server-nine.vercel.app/application-reject/${id}`, { method: 'PATCH' });
        if (res.ok) {
            Swal.fire('Rejected', 'Application has been rejected.', 'info');
            fetchApplications();
        }
    };

    if (loading) return (
        <div className="text-center py-10">
            <span className="loading loading-spinner text-emerald-400"></span>
        </div>
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8 theme-accent-text border-b-2 border-emerald-400 pb-2">
                Applied Tutors
            </h1>
            
            {applications.length === 0 ? (
                <p className="text-gray-400 text-center">No applications found for your tuition posts.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {applications.map(app => (
                        <div key={app._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                {/* টিউটরের ছবি (যদি থাকে) বা ডিফল্ট ছবি */}
                                <img 
                                    src={app.tutorPhoto || 'https://via.placeholder.com/150'} 
                                    className="w-16 h-16 rounded-full border-2 border-emerald-400" 
                                    alt={app.tutorName} 
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-white">{app.tutorName}</h2>
                                    <p className="text-emerald-400 text-sm">{app.qualifications}</p>
                                </div>
                            </div>
                            
                            <div className="text-gray-300 text-sm space-y-2 mb-6">
                                <p><strong>Subject:</strong> {app.subject}</p>
                                <p><strong>Experience:</strong> {app.experience}</p>
                                <p><strong>Expected Salary:</strong> {app.expectedSalary} BDT</p>
                                <p><strong>Status:</strong> <span className="badge badge-warning">{app.status}</span></p>
                            </div>

                            <div className="flex gap-3">
                                {/* Approve & Pay বাটনে ক্লিক করলে স্ট্রাইপ পেজে নিয়ে যাবে */}
                                <button 
                                    onClick={() => handleApproveAndPay(app)}
                                    className="btn btn-sm bg-emerald-500 text-black flex-1 border-none font-bold"
                                    disabled={app.status === 'Approved'}
                                >
                                    {app.status === 'Approved' ? 'Already Approved' : 'Approve & Pay'}
                                </button>
                                
                                <button 
                                    onClick={() => handleReject(app._id)} 
                                    className="btn btn-sm btn-outline btn-error flex-1"
                                    disabled={app.status === 'Approved'}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedTutors;