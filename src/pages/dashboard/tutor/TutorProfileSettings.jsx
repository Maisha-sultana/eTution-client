// src/pages/dashboard/tutor/TutorProfileSettings.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Swal from 'sweetalert2';

const TutorProfileSettings = () => {
    const { user } = useAuth(); // বর্তমানে লগইন করা ইউজারের ডাটা
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        tutorEmail: '',
        photo: '',
        university: '',
        specialization: '',
        experience: '',
        bio: ''
    });

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/tutor-profile/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // যদি ডাটাবেজে প্রোফাইল থাকে তবে তা সেট হবে, 
                    // অন্যথায় লগইন করা ইউজারের ডিফল্ট ডাটা সেট হবে
                    setProfile({
                        name: data.name || user.displayName || '',
                        tutorEmail: user.email,
                        photo: data.photo || user.photoURL || '',
                        university: data.university || '',
                        specialization: data.specialization || '',
                        experience: data.experience || '',
                        bio: data.bio || ''
                    });
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/tutor-profile-update', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });

        if (response.ok) {
            Swal.fire('Success!', 'Profile updated successfully.', 'success');
        }
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-emerald-400"></span></div>;

    const inputClasses = "input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-emerald-400";

    return (
        <div className="p-6 max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-emerald-400/20">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Edit Tutor Profile</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Email (Read Only) */}
                <div className="form-control">
                    <label className="label text-gray-300">Email (Cannot be changed)</label>
                    <input type="email" value={profile.tutorEmail} readOnly className={`${inputClasses} opacity-50 cursor-not-allowed`} />
                </div>

                <div className="form-control">
                    <label className="label text-gray-300">Full Name</label>
                    <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className={inputClasses} required />
                </div>

                <div className="form-control">
                    <label className="label text-gray-300">University</label>
                    <input type="text" value={profile.university} onChange={(e) => setProfile({...profile, university: e.target.value})} className={inputClasses} placeholder="e.g. Dhaka University" required />
                </div>

                <div className="form-control">
                    <label className="label text-gray-300">Specialization</label>
                    <input type="text" value={profile.specialization} onChange={(e) => setProfile({...profile, specialization: e.target.value})} className={inputClasses} placeholder="e.g. Mathematics, Physics" required />
                </div>

                <div className="form-control">
                    <label className="label text-gray-300">Experience (Years)</label>
                    <input type="text" value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})} className={inputClasses} placeholder="e.g. 3 years" />
                </div>

                <div className="form-control">
                    <label className="label text-gray-300">Short Bio</label>
                    <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className={`${inputClasses} h-24 p-2`} placeholder="Tell students about your teaching style..."></textarea>
                </div>

                <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-gray-900 w-full font-bold border-none mt-4">
                    Save Profile Changes
                </button>
            </form>
        </div>
    );
};

export default TutorProfileSettings;