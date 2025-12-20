import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className="theme-bg-dark theme-text-light min-h-screen">
            {/* Hero Section */}
            <header className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-emerald-400/20 overflow-hidden text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 px-4"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-6">
                        About <span className="theme-accent-text">SikkhaHub</span>
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
                        Redefining the tuition ecosystem. We connect qualified mentors with students through a transparent, secure, and digitally-driven platform.
                    </p>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
                
                {/* Mission Section */}
                <motion.section 
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6 theme-secondary-text">Our Mission</h2>
                        <p className="text-lg mb-4">
                            At SikkhaHub, our mission is to simplify the tuition process in Bangladesh. We bridge the gap between academic needs and expert guidance by providing a platform where trust is built through verification.
                        </p>
                        <p className="text-lg">
                            We believe every student deserves a mentor who fits their unique learning style. By digitizing tracking and payments, we ensure a professional experience for both tutors and parents.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 bg-gray-800 p-8 rounded-2xl border border-emerald-400/20 shadow-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-900 rounded-lg">
                                <h3 className="text-3xl font-bold theme-accent-text">100%</h3>
                                <p className="text-xs uppercase tracking-widest mt-2">Verified Tutors</p>
                            </div>
                            <div className="text-center p-4 bg-gray-900 rounded-lg">
                                <h3 className="text-3xl font-bold theme-accent-text">Secure</h3>
                                <p className="text-xs uppercase tracking-widest mt-2">Stripe Payments</p>
                            </div>
                            <div className="text-center p-4 bg-gray-900 rounded-lg">
                                <h3 className="text-3xl font-bold theme-accent-text">Smart</h3>
                                <p className="text-xs uppercase tracking-widest mt-2">Matching</p>
                            </div>
                            <div className="text-center p-4 bg-gray-900 rounded-lg">
                                <h3 className="text-3xl font-bold theme-accent-text">24/7</h3>
                                <p className="text-xs uppercase tracking-widest mt-2">Admin Support</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Core Features */}
                <motion.section 
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-12 theme-accent-text">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Transparency */}
                        <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-400 transition-colors">
                            <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-6 h-6 theme-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Transparency</h3>
                            <p className="text-sm">Every application and payment is tracked digitally via your dashboard.</p>
                        </div>
                        {/* Seamless Payments */}
                        <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-400 transition-colors">
                            <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-6 h-6 theme-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Tutors</h3>
                            <p className="text-sm">We manually review tutor profiles to ensure high academic standards.</p>
                        </div>
                        {/* Reliable Community */}
                        <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-400 transition-colors">
                            <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-6 h-6 theme-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Global Standards</h3>
                            <p className="text-sm">Using industry-leading technology like React, MongoDB, and Stripe.</p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutPage;