// src/pages/dashboard/MyTuitions.jsx (NEW FILE)

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; 

// Component to handle Edit Modal and Form
const EditTuitionModal = ({ post, onUpdate, onClose }) => {
    // Reusing the form structure but making it a controlled component for the modal
    const [formData, setFormData] = useState(post);
    const [loading, setLoading] = useState(false);
    const apiUrl = 'http://localhost:3000/tuition';

    const inputClasses = "input input-bordered w-full bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500";
    const labelClasses = "label text-gray-300 font-medium mb-1";
    const selectClasses = "select select-bordered w-full bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/${formData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Your tuition post has been updated.', 'success');
                onUpdate(); // Re-fetch data
                onClose(); // Close modal
            } else if (data.message.includes('not found')) {
                 Swal.fire('Error', data.message, 'error');
            } else {
                 Swal.fire('No Change', 'No changes were made to the post.', 'info');
                 onClose();
            }

        } catch (err) {
            console.error('Update Error:', err);
            Swal.fire('Error', 'Failed to update post.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Modal component (using daisyUI modal)
        <dialog id="edit_modal" className="modal" open>
            <div className="modal-box bg-gray-800 p-8 max-w-2xl">
                <h3 className="font-bold text-2xl text-emerald-400 mb-6">Edit Tuition Post</h3>
                <form onSubmit={handleUpdate}>
                    
                    {/* Row 1: Subject and Class Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Subject *</span>
                            <input type="text" name="subject" value={formData.subject || ''} onChange={handleChange} required className={inputClasses} />
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Class Level *</span>
                            <input type="text" name="classLevel" value={formData.classLevel || ''} onChange={handleChange} required className={inputClasses} />
                        </label>
                    </div>

                    {/* Row 2: Location and Budget/Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                         <label className="form-control w-full">
                            <span className={labelClasses}>Preferred Location *</span>
                            <input type="text" name="location" value={formData.location || ''} onChange={handleChange} required className={inputClasses} />
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Budget / Salary Range *</span>
                            <input type="text" name="salary" value={formData.salary || ''} onChange={handleChange} required className={inputClasses} />
                        </label>
                    </div>
                    
                    {/* Row 3: Tuition Type and Contact Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Tuition Type *</span>
                            <select name="type" value={formData.type || 'Home Tutor'} onChange={handleChange} required className={selectClasses}>
                                <option value="Home Tutor">Home Tutor (At Student's Place)</option>
                                <option value="Online Tutor">Online Tutor</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <span className={labelClasses}>Contact Phone *</span>
                            <input type="text" name="contactPhone" value={formData.contactPhone || ''} onChange={handleChange} required className={inputClasses} />
                        </label>
                    </div>

                    {/* Row 4: Requirements */}
                    <div className="mb-6">
                        <label className="form-control w-full">
                            <span className={labelClasses}>Specific Requirements</span>
                            <textarea name="requirements" value={formData.requirements || ''} onChange={handleChange} placeholder="e.g., Needs a female tutor, University student preferred, Must teach in English medium." className={`${inputClasses} h-24`} />
                        </label>
                    </div>

                    <div className="modal-action mt-6">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button 
                            type="submit" 
                            className="btn bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};


const MyTuitions = () => {
    const { user } = useAuth();
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const apiUrl = 'http://localhost:3000';

    const fetchTuitions = async () => {
        if (!user?.email) {
            setError('User email not available. Cannot fetch posts.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${apiUrl}/my-tuitions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email })
            });
            
            if (!res.ok) throw new Error('Failed to fetch tuition posts.');
            
            const data = await res.json();
            setTuitions(data);

        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Could not load your tuition posts. Check the backend connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTuitions();
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${apiUrl}/tuition/${id}`, {
                        method: 'DELETE',
                    });
                    
                    const data = await response.json();
                    
                    if (data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your tuition post has been deleted.', 'success');
                        fetchTuitions(); // Refresh the list
                    } else {
                         Swal.fire('Error', data.message || 'Failed to delete post.', 'error');
                    }
                } catch (err) {
                    console.error('Delete Error:', err);
                    Swal.fire('Error', 'Failed to connect to the server for deletion.', 'error');
                }
            }
        });
    };

    const handleEditClick = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className='flex justify-center py-10'><span className="loading loading-spinner loading-lg text-emerald-400"></span></div>;
    }

    if (error) {
        return <p className="text-center text-red-400 py-10">{error}</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-8 theme-accent-text border-b-2 border-emerald-400 pb-2">
                My Tuition Posts ({tuitions.length})
            </h1>
            
            {tuitions.length === 0 ? (
                <div className="text-center py-10 bg-gray-700/50 rounded-lg">
                    <p className="text-xl text-gray-300 mb-4">You have not posted any tuitions yet.</p>
                    <p className="text-sm theme-text-light">Click "Post New Tuition" in the sidebar to create one.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {tuitions.map(post => (
                        <div key={post._id} className="p-5 bg-gray-700 rounded-lg shadow-xl border-l-4 border-emerald-400/80">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-gray-50">{post.subject} ({post.classLevel})</h2>
                                <span className={`badge ${post.status === 'Approved' ? 'badge-success' : post.status === 'Pending' ? 'badge-warning' : 'badge-error'} text-xs font-semibold`}>
                                    {post.status}
                                </span>
                            </div>
                            <p className="text-sm theme-text-light mb-4">
                                <span className='font-semibold'>Location:</span> {post.location} | 
                                <span className='font-semibold ml-2'>Salary:</span> {post.salary} |
                                <span className='font-semibold ml-2'>Type:</span> {post.type}
                            </p>
                            <p className="text-sm text-gray-300 italic mb-4">
                                Requirements: {post.requirements || 'N/A'}
                            </p>

                            <div className="flex space-x-3 mt-4">
                                <button 
                                    onClick={() => handleEditClick(post)} 
                                    className="btn btn-sm bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.414 4.142l-.793.793-2.828-2.828.793-.793 2.828 2.828zM3 17.25V14l9.5-9.5 3 3-9.5 9.5H3z" /></svg>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(post._id)} 
                                    className="btn btn-sm btn-error text-white hover:bg-red-600 border-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && selectedPost && (
                <EditTuitionModal 
                    post={selectedPost} 
                    onUpdate={fetchTuitions} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </motion.div>
    );
};

export default MyTuitions;