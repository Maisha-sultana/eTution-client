import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className="min-h-screen theme-bg-dark flex flex-col items-center justify-center text-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-9xl font-black theme-accent-text mb-4">404</h1>
                <h2 className="text-3xl font-bold text-white mb-6">Oops! Page Not Found</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="btn bg-emerald-500 hover:bg-emerald-600 text-gray-900 border-none font-bold px-10">
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;