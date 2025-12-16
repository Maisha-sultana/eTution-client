// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// 👇️ ফিক্স: Wildcard Import ব্যবহার করা হলো
import * as jwtDecodeModule from 'jwt-decode'; 

// 👇️ ULTIMATE FIX: Wrapper Function ব্যবহার করে মডিউল অবজেক্ট থেকে ফাংশনটি নিরাপদে খুঁজে বের করা হলো।
const jwtDecode = (token) => {
    let decoder = null;

    // 1. Named Export (jwtDecode) প্রপার্টিটি খুঁজুন (v4+)
    if (typeof jwtDecodeModule.jwtDecode === 'function') {
        decoder = jwtDecodeModule.jwtDecode; 
    }
    // 2. যদি না পাওয়া যায়, তবে Default Export (default) খুঁজুন (v3.0.0-)
    else if (typeof jwtDecodeModule.default === 'function') {
        decoder = jwtDecodeModule.default;
    }
    // 3. যদি তাও না হয়, তবে মডিউল অবজেক্টটি নিজেই ফাংশন কিনা দেখুন
    else if (typeof jwtDecodeModule === 'function') {
        decoder = jwtDecodeModule;
    }

    if (typeof decoder !== 'function') {
        // যদি সমস্ত চেক ব্যর্থ হয়, তবে ইনস্টলেশন সমস্যা নিশ্চিত।
        console.error("JWT-Decode Final Check Failed. Imported module:", jwtDecodeModule);
        throw new TypeError("decodeFunction is not a function. FINAL CHECK FAILED. Ensure 'jwt-decode' is installed.");
    }
    
    return decoder(token);
}


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { logIn, googleSignIn } = useAuth();
    const navigate = useNavigate();

    // Helper function to handle routing based on JWT role
    const handleRoleBasedRedirect = () => {
        const token = localStorage.getItem('access-token');
        
        // If token is found, use role from JWT
        if (token) {
            try {
                // Decode the JWT to get the user's role
                const decoded = jwtDecode(token);
                const role = decoded?.role?.toLowerCase();
                
                // Navigate to the role-specific dashboard (e.g., /dashboard/student)
                if (role === 'student' || role === 'tutor' || role === 'admin') {
                    navigate(`/dashboard/${role}`, { replace: true }); 
                } else {
                    navigate('/dashboard', { replace: true }); 
                }
            } catch (err) {
                // This catch handles invalid token decode errors
                console.error("JWT Decode Error (Fallback to Student):", err);
                // Fallback: Default to student role if token is invalid or role missing
                navigate('/dashboard/student', { replace: true }); 
            }
        } else {
            // Fallback: If token is still missing after wait, go to default student path.
            navigate('/dashboard/student', { replace: true }); 
        }
    };

    // 1. Email & Password Login (UPDATED)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await logIn(email, password); 
            
            // --- FIX: Add a short delay to mitigate the race condition ---
            setTimeout(() => { 
                handleRoleBasedRedirect();
            }, 500); // Wait 500ms to ensure JWT is saved in localStorage

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            // This setLoading(false) ensures the login button is re-enabled immediately after the promise resolves
            setLoading(false); 
        }
    };

    // 2. Google Social Login (UPDATED)
    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await googleSignIn(); 
            
            // --- FIX: Add a short delay to mitigate the race condition ---
            setTimeout(() => { 
                handleRoleBasedRedirect();
            }, 500); // Wait 500ms to ensure JWT is saved in localStorage

        } catch (err) {
            console.error(err);
            setError('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "input input-bordered w-full bg-gray-700 border-gray-600 focus:border-emerald-400 theme-text-light";
    const labelClasses = "label theme-accent-text";

    return (
        <div className="p-4 max-w-lg mx-auto my-6">
            <h1 className="text-4xl font-extrabold mb-4 theme-accent-text text-center">Login</h1>
            <p className='theme-text-light text-center mb-4'>Access your SikkhaHub account.</p>

            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-400/30">
                <form onSubmit={handleSubmit} className="card-body p-0">
                    {error && <div role="alert" className="alert alert-error mb-4 text-white">{error}</div>}
                    
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
                            <span className={labelClasses}>Password</span>
                        </label>
                        <input type="password" placeholder="password" className={inputClasses} required 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6 flex justify-center">
                        <button type="submit" className="btn bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none font-semibold"
                                disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    <div className="divider theme-text-light">OR</div>

                    {/* Google Social Login Button */}
                    <button type="button" 
                            onClick={handleGoogleSignIn} 
                            className="btn btn-outline border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition duration-200"
                            disabled={loading}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48" fill="currentColor">
                            <path fill="#FFC107" d="M43.6 20.4H24v7.3h11.2c-.4 2.1-1.6 3.8-3.3 5V38h6.7c4-3.7 6.3-9.1 6.3-15.6 0-1.1-.1-2.2-.3-3.2z"/>
                            <path fill="#FF3D00" d="M24 44c6.3 0 11.6-2.1 15.5-5.7L33 32.3c-2.6 1.8-6 2.8-9 2.8-6.9 0-12.7-4.6-14.8-10.8H2.4v6.8C6.4 39.8 14.5 44 24 44z"/>
                            <path fill="#4CAF50" d="M9.2 28.5c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V18.3H2.4c-.6 1.2-.9 2.5-.9 3.9s.3 2.7.9 3.9l6.8 2.4z"/>
                            <path fill="#1976D2" d="M24 13.9c3.2 0 6.1 1.1 8.4 3.3L37.9 12c-3.7-3.4-8.8-5.7-13.9-5.7-9.5 0-17.6 4.2-21.6 10.9l6.8 5.2c2.1-6.2 7.9-10.8 14.8-10.8z"/>
                        </svg>
                        Login with Google
                    </button>
                    
                    <p className='text-sm text-center mt-4 theme-text-light'>
                        Don't have an account? <Link to="/register" className="theme-accent-text hover:underline font-semibold">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;