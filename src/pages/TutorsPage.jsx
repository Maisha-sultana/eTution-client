import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TutorsPage = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/all-tutors')
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tutors:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20 theme-bg-dark min-h-screen">
            <span className="loading loading-spinner loading-lg text-emerald-400"></span>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen theme-bg-dark">
            <h1 className="text-4xl font-extrabold mb-10 theme-accent-text border-b-2 border-emerald-400 pb-2 inline-block">
                Tutors Directory
            </h1>

            {tutors.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No tutors found at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <motion.div
                            key={tutor._id}
                            className="p-6 bg-gray-800 rounded-xl shadow-2xl border-t-4 border-yellow-400/80 flex flex-col items-center text-center transition duration-300 transform hover:scale-[1.02]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                                    <img src={tutor.photo || 'https://via.placeholder.com/150'} alt={tutor.name} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold theme-secondary-text mb-1">{tutor.name}</h3>
                            <p className="text-sm text-gray-300 mb-2">{tutor.university}</p>
                            <div className="badge badge-outline border-emerald-400 text-emerald-400 mb-4">
                                {tutor.specialization}
                            </div>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.695h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.724c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.695l1.07-3.292z" />
                                </svg>
                                {tutor.rating} ({tutor.experience})
                            </div>
                            <button className="btn btn-sm bg-emerald-500 text-gray-900 border-none hover:bg-emerald-600 w-full font-bold">
                                View Profile
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TutorsPage;