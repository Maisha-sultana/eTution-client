// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(''); // Default role
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { createUser } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            await createUser(email, password, name, phone, role);
            navigate('/dashboard'); 
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "input input-bordered w-full bg-gray-700 border-gray-600 focus:border-emerald-400 theme-text-light";
    const labelClasses = "label theme-accent-text";

    return (
        // ********** START OF UI CHANGE **********
        <div className="p-4 max-w-xl mx-auto my-4">
            <h1 className="text-4xl font-extrabold mb-3 theme-accent-text text-center">Register</h1>
            <p className='theme-text-light text-center mb-4'>Create a new  account for SikkhaHub.</p>

            {/* This is the new visually distinct card wrapper */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-400/30">
                <form onSubmit={handleSubmit} className="card-body p-0">
                    {error && <div role="alert" className="alert alert-error mb-4 text-white">{error}</div>}
                    
                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className={labelClasses}>Full Name</span>
                        </label>
                        <input type="text" placeholder="Your Name" className={inputClasses} required 
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    
                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className={labelClasses}>Email</span>
                        </label>
                        <input type="email" placeholder="email@example.com" className={inputClasses} required 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className={labelClasses}>Password (min 6 chars)</span>
                        </label>
                        <input type="password" placeholder="password" className={inputClasses} required 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Phone */}
                    <div className="form-control">
                        <label className="label">
                            <span className={labelClasses}>Phone Number</span>
                        </label>
                        <input type="tel" placeholder="+8801XXXXXXXXX" className={inputClasses} required 
                            value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    {/* Role Selection */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className={labelClasses}>I am registering as a:</span>
                        </label>
                        {/* The role selection background is now gray-700, standing out against gray-800 */}
                        <div className="flex justify-around bg-gray-700 p-3 rounded-lg"> 
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="role" value="Student" className="radio radio-primary checked:bg-emerald-400" 
                                    checked={role === 'Student'} onChange={() => setRole('Student')} />
                                <span className="theme-text-light">Student</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="role" value="Tutor" className="radio radio-primary checked:bg-emerald-400" 
                                    checked={role === 'Tutor'} onChange={() => setRole('Tutor')} />
                                <span className="theme-text-light">Tutor</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4 flex justify-center">
                        <button type="submit" className="btn bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none font-semibold"
                                disabled={loading}>
                            {loading ? 'Registering...' : 'Register Account'}
                        </button>
                    </div>
                    
                    <p className='text-sm text-center mt-4 theme-text-light'>
                        Already have an account? <Link to="/login" className="theme-accent-text hover:underline font-semibold">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
        // ********** END OF UI CHANGE **********
    );
};

export default RegisterPage;