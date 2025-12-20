import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Swal from 'sweetalert2';

const StudentProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        institution: '',
        address: ''
    });

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/student-profile/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setProfile({
                        name: data.name || user.displayName || '',
                        email: user.email,
                        phone: data.phone || '',
                        institution: data.institution || '',
                        address: data.address || ''
                    });
                    setLoading(false);
                });
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/student-profile-update', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });

        if (response.ok) {
            Swal.fire('Success!', 'Your profile has been updated.', 'success');
        }
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-emerald-400"></span></div>;

    const inputClasses = "input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-emerald-400";

    return (
        <div className="p-6 max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-emerald-400/20">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Student Profile Settings</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="form-control">
                    <label className="label text-gray-300">Email (Read Only)</label>
                    <input type="email" value={profile.email} readOnly className={`${inputClasses} opacity-50`} />
                </div>
                <div className="form-control">
                    <label className="label text-gray-300">Full Name</label>
                    <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className={inputClasses} required />
                </div>
                <div className="form-control">
                    <label className="label text-gray-300">Phone Number</label>
                    <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className={inputClasses} />
                </div>
                <div className="form-control">
                    <label className="label text-gray-300">School/College/University</label>
                    <input type="text" value={profile.institution} onChange={(e) => setProfile({...profile, institution: e.target.value})} className={inputClasses} placeholder="Enter your institution name" />
                </div>
                <div className="form-control">
                    <label className="label text-gray-300">Address</label>
                    <textarea value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className={`${inputClasses} h-24 p-2`} placeholder="Your current address"></textarea>
                </div>
                <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-gray-900 w-full font-bold border-none mt-4">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default StudentProfile;