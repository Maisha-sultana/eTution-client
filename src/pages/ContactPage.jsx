import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    
        Swal.fire({
            title: "Message Sent!",
            text: "Thank you for contacting SikkhaHub. We will get back to you soon.",
            icon: "success",
            confirmButtonColor: "#10B981"
        });
        e.target.reset();
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors";

    return (
        <div className="theme-bg-dark min-h-screen text-white">
            {/* Header Section */}
            <header className="py-8 bg-gray-900/50 border-b border-emerald-400/10 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold theme-accent-text mb-2"
                >
                    Get in Touch
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto px-4">
                    Have questions about finding a tutor or posting a tuition?
                    <br/> Our team is here to help you 24/7.
                </p>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Contact Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-6 theme-secondary-text">Contact Information</h2>
                            <p className="text-gray-400 mb-8">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center text-emerald-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <p className="font-semibold">+880 1700 000 000</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center text-emerald-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="font-semibold">support@sikshahub.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center text-emerald-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Office</p>
                                    <p className="font-semibold">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-emerald-400/20"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-emerald-400">Full Name</label>
                                    <input type="text" required className={inputClasses} placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-emerald-400">Email Address</label>
                                    <input type="email" required className={inputClasses} placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-emerald-400">Subject</label>
                                <input type="text" required className={inputClasses} placeholder="How can we help?" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-emerald-400">Message</label>
                                <textarea required rows="4" className={inputClasses} placeholder="Your message here..."></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;