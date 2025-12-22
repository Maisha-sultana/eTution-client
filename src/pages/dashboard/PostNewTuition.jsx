
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // Assuming sweetalert2 is installed

const PostNewTuition = () => {
   
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        
        const tuitionData = {
            studentEmail: user?.email,
            studentName: user?.displayName,
            subject: form.subject.value,
            classLevel: form.classLevel.value,
            location: form.location.value,
            salary: form.salary.value,
            requirements: form.requirements.value,
            type: form.type.value,
            contactPhone: form.contactPhone.value,
            status: 'Pending', // 
    createdAt: new Date(),
        };

        try {
         
            const response = await fetch('https://e-tution-server-nine.vercel.app/tuition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Add token if you implement JWT auth middleware
                },
                body: JSON.stringify(tuitionData),
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Post Submitted!',
                    text: data.message, // "Tuition post submitted successfully. It is currently pending admin review."
                    confirmButtonColor: '#10B981',
                });
                form.reset();
            } else {
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message || 'Something went wrong while submitting the post!',
                    confirmButtonColor: '#EF4444',
                });
            }

        } catch (err) {
            console.error('Submission Error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Could not connect to the server. Check if your backend is running.',
                confirmButtonColor: '#EF4444',
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "input input-bordered w-full bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500";
    const labelClasses = "label text-gray-300 font-medium mb-1";
    const selectClasses = "select select-bordered w-full bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500";


    return (
        <motion.div 
            className="p-4 theme-bg-dark min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Removed <Helmet> tag as requested */}
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-8 theme-accent-text border-b-2 border-emerald-400 pb-2">
                Post New Tuition
            </h1>

            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-400/30">
                <p className="text-gray-300 mb-6">
                    Fill out the form below to publish your tuition request. Your post will be visible to tutors after admin approval.
                </p>

                <form onSubmit={handleSubmit}>
                    
                    {/* Row 1: Subject and Class Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Subject <span className='text-red-500'>*</span></span>
                            <input type="text" name="subject" placeholder="e.g., Higher Math, Physics" required className={inputClasses} />
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Class Level <span className='text-red-500'>*</span></span>
                            <input type="text" name="classLevel" placeholder="e.g., HSC 2nd Year, Class 9-10" required className={inputClasses} />
                        </label>
                    </div>

                    {/* Row 2: Location and Budget/Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                         <label className="form-control w-full">
                            <span className={labelClasses}>Preferred Location <span className='text-red-500'>*</span></span>
                            <input type="text" name="location" placeholder="e.g., Dhanmondi, Uttara Sector 7" required className={inputClasses} />
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Budget / Salary Range <span className='text-red-500'>*</span></span>
                            <input type="text" name="salary" placeholder="e.g., 8000-10000 BDT/Month" required className={inputClasses} />
                        </label>
                    </div>
                    
                    {/* Row 3: Tuition Type and Contact Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Tuition Type <span className='text-red-500'>*</span></span>
                            <select name="type" required className={selectClasses}>
                                <option value="Home Tutor">Home Tutor (At Student's Place)</option>
                                <option value="Online Tutor">Online Tutor</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Contact Phone <span className='text-red-500'>*</span></span>
                            <input type="text" name="contactPhone" placeholder="Your best contact number" required className={inputClasses} />
                        </label>
                    </div>

                    {/* Row 4: Requirements */}
                    <div className="mb-6">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Specific Requirements</span>
                            <textarea name="requirements" placeholder="e.g., Needs a female tutor, University student preferred, Must teach in English medium." className={`${inputClasses} h-24`} />
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-full bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none text-lg font-semibold shadow-lg shadow-emerald-500/40"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Post Tuition Request'}
                    </button>
                    <p className='text-center text-sm text-gray-400 mt-3'>* Your post status will be 'Pending' until approved by Admin.</p>
                </form>
            </div>
        </motion.div>
    );
};

export default PostNewTuition;