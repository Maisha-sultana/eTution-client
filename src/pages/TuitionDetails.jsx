import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import * as jwtDecodeModule from 'jwt-decode';

// JWT থেকে রোল বের করার জন্য হেল্পার ফাংশন
const jwtDecode = (token) => {
    let decoder = null;
    if (typeof jwtDecodeModule.jwtDecode === 'function') decoder = jwtDecodeModule.jwtDecode;
    else if (typeof jwtDecodeModule.default === 'function') decoder = jwtDecodeModule.default;
    else if (typeof jwtDecodeModule === 'function') decoder = jwtDecodeModule;
    return decoder ? decoder(token) : null;
};

const TuitionDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [tuition, setTuition] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // ইউজার রোল চেক করা
    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded?.role?.toLowerCase());
            } catch (err) {
                console.error("Token decode error", err);
            }
        }
    }, [user]);

    useEffect(() => {
        fetch(`https://e-tution-server-nine.vercel.app/tuition/${id}`)
            .then(res => res.json())
            .then(data => setTuition(data));
    }, [id]);

    // অ্যাপ্লিকেশন সাবমিট হ্যান্ডলার
    const handleApplySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const applicationData = {
            tuitionId: tuition._id,
            subject: tuition.subject,
            studentEmail: tuition.studentEmail,
            tutorEmail: user.email,
            tutorName: user.displayName,
            qualifications: form.qualifications.value,
            experience: form.experience.value,
            expectedSalary: form.salary.value,
            status: 'Pending',
            appliedAt: new Date()
        };

        try {
            const res = await fetch('https://e-tution-server-nine.vercel.app/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationData)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire('Success!', 'Your application has been submitted.', 'success');
                setShowModal(false);
            } else {
                Swal.fire('Error', data.message || 'Already applied for this post.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to connect to server.', 'error');
        }
    };

    if (!tuition) return <div className="p-10 text-white text-center">Loading...</div>;

    const inputClasses = "input input-bordered w-full bg-gray-700 border-gray-600 text-white focus:border-emerald-400";
    const labelClasses = "label text-emerald-400 font-semibold";

    return (
        <div className="p-6 md:p-10 text-white max-w-4xl mx-auto min-h-screen">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-emerald-400/20">
                <h1 className="text-4xl font-extrabold theme-accent-text mb-6 border-b border-gray-700 pb-4">{tuition.subject}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-lg">
                    <p><span className="text-gray-400 font-medium">Class:</span> {tuition.classLevel}</p>
                    <p><span className="text-gray-400 font-medium">Location:</span> {tuition.location}</p>
                    <p><span className="text-gray-400 font-medium">Salary Range:</span> {tuition.salary} BDT</p>
                    <p><span className="text-gray-400 font-medium">Type:</span> {tuition.type}</p>
                    <p className="md:col-span-2"><span className="text-gray-400 font-medium">Requirements:</span> {tuition.requirements || "None"}</p>
                </div>

                {/* শুধুমাত্র টিউটর হলে "Apply" বাটন দেখাবে */}
                {userRole === 'tutor' && (
                    <button 
                        onClick={() => setShowModal(true)} 
                        className="btn bg-emerald-500 hover:bg-emerald-600 text-gray-900 border-none px-10 font-bold"
                    >
                        Apply Now
                    </button>
                )}
            </div>

            {/* Application Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-gray-800 p-8 rounded-xl border border-emerald-400/50 w-full max-w-lg shadow-2xl animate-fade-in">
                        <h3 className="text-2xl font-bold theme-accent-text mb-6">Apply for Tuition</h3>
                        
                        <form onSubmit={handleApplySubmit} className="space-y-4">
                            {/* Read-only fields */}
                            <div className="form-control">
                                <label className={labelClasses}>Name (Read-only)</label>
                                <input type="text" value={user?.displayName} readOnly className={inputClasses + " opacity-70"} />
                            </div>
                            <div className="form-control">
                                <label className={labelClasses}>Email (Read-only)</label>
                                <input type="email" value={user?.email} readOnly className={inputClasses + " opacity-70"} />
                            </div>

                            {/* Input fields */}
                            <div className="form-control">
                                <label className={labelClasses}>Qualifications *</label>
                                <input name="qualifications" placeholder="e.g. B.Sc in CSE, DU" required className={inputClasses} />
                            </div>
                            <div className="form-control">
                                <label className={labelClasses}>Experience *</label>
                                <input name="experience" placeholder="e.g. 2 years of teaching" required className={inputClasses} />
                            </div>
                            <div className="form-control">
                                <label className={labelClasses}>Expected Salary (BDT) *</label>
                                <input name="salary" type="number" placeholder="e.g. 8000" required className={inputClasses} />
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)} 
                                    className="btn btn-outline border-gray-600 text-gray-400 flex-1"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn bg-emerald-500 hover:bg-emerald-600 text-gray-900 border-none flex-1 font-bold"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TuitionDetails;