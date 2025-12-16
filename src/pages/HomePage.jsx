// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// AOS attributes are used below, assuming AOS is initialized in main.jsx

// Component: Dot Pattern Background for visual interest in Hero Section
const DotPattern = () => (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {/* Simple dot pattern using background image */}
        <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(#4a4a4a 1px, transparent 0)`,
            backgroundSize: `20px 20px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, transparent 80%)`,
        }}></div>
    </div>
);


// Component: Tuition Card
const TuitionCard = ({ tuition }) => (
    <motion.div 
        className="p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-emerald-500/80 hover:border-emerald-400 transition duration-300 transform hover:scale-[1.02]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        data-aos="fade-up" // AOS Effect
        data-aos-delay="50"
    >
        <h3 className="text-xl font-bold theme-accent-text mb-2">{tuition.subject}</h3>
        <p className="text-sm text-gray-400 mb-3">{tuition.classLevel} | {tuition.location}</p>
        <div className="space-y-1">
            <p className="text-gray-300 text-sm">
                <span className="font-semibold">Salary:</span> {tuition.salary}
            </p>
            <p className="text-gray-300 text-sm">
                <span className="font-semibold">Type:</span> {tuition.type}
            </p>
            <p className="text-gray-400 text-xs">
                <span className="font-semibold text-gray-300">Requirements:</span> {tuition.requirements}
            </p>
        </div>
        <Link to="/tuitions" className="btn btn-sm bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-none mt-4">View Details</Link>
    </motion.div>
);

// Component: Tutor Card
const TutorCard = ({ tutor }) => (
    <motion.div
        className="p-4 bg-gray-800 rounded-xl shadow-2xl border-t-4 border-yellow-400/80 hover:border-yellow-300 transition duration-300 flex flex-col items-center text-center transform hover:translate-y-[-5px]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        data-aos="zoom-in" // AOS Effect
        data-aos-delay="100"
    >
        <div className="avatar mb-3">
            <div className="w-20 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                <img src={tutor.photo} alt={tutor.name} />
            </div>
        </div>
        <h3 className="text-lg font-bold theme-secondary-text">{tutor.name}</h3>
        <p className="text-xs text-gray-300">{tutor.university}</p>
        <p className="text-sm theme-accent-text font-semibold mt-2">{tutor.specialization}</p>
        <div className="flex items-center text-xs mt-1 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.695h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.724c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.695l1.07-3.292z" />
            </svg>
            {tutor.rating} ({tutor.experience})
        </div>
    </motion.div>
);

// Component for How it Works Step
const WorkStep = ({ number, title, description, icon }) => (
    <motion.div 
        className="text-center p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 hover:border-emerald-400 transition duration-300 relative group"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        data-aos="fade-left" // AOS Effect
        data-aos-delay={number * 100} // Stagger delay based on step number
    >
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-emerald-400/10 group-hover:bg-emerald-400 transition duration-300">
            {icon}
        </div>
        {/* Step Number Badge */}
        <span className="absolute top-0 right-0 m-4 text-3xl font-extrabold theme-accent-text opacity-50 group-hover:opacity-100 transition duration-300">{`0${number}`}</span>
        
        <h3 className="text-2xl font-bold text-gray-50 mb-2 mt-4">{title}</h3>
        <p className="theme-text-light text-sm">{description}</p>
    </motion.div>
);

// Component for Why Choose Us Feature
const FeatureCard = ({ title, description, icon, delay }) => (
    <motion.div 
        className="p-6 bg-gray-800 rounded-xl shadow-lg border border-yellow-400/20 hover:border-yellow-400 transition duration-300 flex items-start space-x-4"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 100 }}
        data-aos="fade-up" // AOS Effect
        data-aos-delay={delay} // Stagger delay
    >
        <div className="w-8 h-8 flex-shrink-0 theme-secondary-text">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-gray-50">{title}</h4>
            <p className="theme-text-light text-sm mt-1">{description}</p>
        </div>
    </motion.div>
);


const HomePage = () => {
    const [latestTuitions, setLatestTuitions] = useState([]);
    const [latestTutors, setLatestTutors] = useState([]);
    const [loadingTuitions, setLoadingTuitions] = useState(true);
    const [loadingTutors, setLoadingTutors] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = 'http://localhost:3000'; 

    // Fetch data logic (POST method)
    useEffect(() => {
        const fetchData = async (endpoint, setter, loadingSetter, errorMsg) => {
            try {
                const res = await fetch(`${apiUrl}/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
                const data = await res.json();
                setter(data);
            } catch (err) {
                console.error(`Fetch Error (${endpoint}):`, err);
                if (endpoint === 'latest-tuitions') setError(errorMsg);
            } finally {
                loadingSetter(false);
            }
        };

        fetchData('latest-tuitions', setLatestTuitions, setLoadingTuitions, 'Could not load latest tuition posts.');
        fetchData('latest-tutors', setLatestTutors, setLoadingTutors, 'Could not load featured tutors.');
    }, []);

    // Framer Motion variants for section headers 
    const headerVariant = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="theme-bg-dark theme-text-light">
            {/* 1. Hero Section (Unique Floating Card Design) */}
            <motion.header 
                // UPDATED PADDING: Adjusted vertical padding
                className="relative overflow-hidden py-20 lg:py-24 text-center border-b border-emerald-400/50"
                style={{ 
                    // Enhanced Gradient for depth
                    background: `linear-gradient(145deg, #101827 0%, #0d121b 100%)` 
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                data-aos="fade-down"
            >
                <DotPattern />
                
                {/* FLOATING GLASS CARD EFFECT CONTAINER */}
                <div 
                    className="relative max-w-5xl mx-auto px-4 z-10 p-10 md:p-14 rounded-xl 
                                backdrop-blur-md bg-gray-900/40 border border-emerald-400/30 
                                shadow-2xl shadow-gray-900/50" // UPDATED Floating Card Style
                >
                    
                    <motion.h1 
                        className="text-5xl lg:text-7xl font-extrabold mb-3 leading-tight" // UPDATED mb-3
                        variants={headerVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className="theme-accent-text font-black">SikkhaHub:</span> <span className="text-gray-50">Connect to <br className='hidden md:inline' />Your <span className='theme-secondary-text'>Future.</span></span> 
                    </motion.h1>
                    
                    {/* Subtle Accent Line Animation */}
                    <motion.div 
                        className="w-1/4 h-1 mx-auto my-5 bg-emerald-400 rounded-full" // UPDATED my-5
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                    ></motion.div>

                    <motion.p 
                        className="text-lg lg:text-xl max-w-2xl mx-auto mb-8 text-gray-300" // UPDATED mb-8
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Find qualified tutors or the perfect tuition post. Transparent, verified, and digital. Your journey to knowledge starts here.
                    </motion.p>
                    <motion.div
                        className="flex justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <Link to="/register" className="btn bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none text-base font-semibold px-8 py-3 h-auto shadow-xl shadow-emerald-500/40 transform hover:scale-105 transition-transform">
                            Join as a Tutor
                        </Link>
                        <Link to="/tuitions" className="btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 text-base font-semibold px-8 py-3 h-auto shadow-xl shadow-yellow-400/40 transform hover:scale-105 transition-transform">
                            Find Tuition
                        </Link>
                    </motion.div>
                </div>
            </motion.header>

            {/* 2. Dynamic Section: Latest Tuition Posts (6 data) */}
            <section className="py-14 max-w-7xl mx-auto px-4"> {/* UPDATED: Increased top padding for separation */}
                <motion.h2 
                    className="text-4xl font-extrabold mb-10 text-center theme-accent-text"
                    variants={headerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    data-aos="fade-right"
                >
                    <span className='border-b-4 border-emerald-400/50 pb-1'>Latest Tuition Posts</span>
                </motion.h2>

                {loadingTuitions ? (
                    <div className='flex justify-center'><span className="loading loading-spinner loading-lg text-emerald-400"></span></div>
                ) : error ? (
                    <p className="text-center text-red-400">{error}</p>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ staggerChildren: 0.1 }} 
                    >
                        {latestTuitions.map((tuition, index) => (
                            <TuitionCard key={index} tuition={tuition} />
                        ))}
                    </motion.div>
                )}
                
                <div className="text-center mt-12" data-aos="fade-up">
                    <Link to="/tuitions" className="btn btn-lg btn-outline border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition duration-200 shadow-md">
                        View All Tuitions
                    </Link>
                </div>
            </section>

            {/* 3. Dynamic Section: Featured Tutors (3 data) */}
            <section className="py-12 max-w-7xl mx-auto px-4 border-t border-gray-700/50">
                <motion.h2 
                    className="text-4xl font-extrabold mb-12 text-center theme-secondary-text"
                    variants={headerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    data-aos="fade-left"
                >
                    <span className='border-b-4 border-yellow-400/50 pb-1'>Featured Tutors</span>
                </motion.h2>

                {loadingTutors ? (
                    <div className='flex justify-center'><span className="loading loading-spinner loading-lg text-yellow-400"></span></div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ staggerChildren: 0.15 }}
                    >
                        {latestTutors.map((tutor, index) => (
                            <TutorCard key={index} tutor={tutor} />
                        ))}
                    </motion.div>
                )}
                
                <div className="text-center mt-12" data-aos="fade-up">
                    <Link to="/tutors" className="btn btn-lg btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition duration-200 shadow-md">
                        View All Tutors
                    </Link>
                </div>
            </section>
            
            {/* 4. How the Platform Works (3 steps visual grid) - AFTER Tutors */}
            <section className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-700/50">
                <motion.h2 
                    className="text-4xl font-extrabold mb-12 text-center text-gray-50"
                    variants={headerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    data-aos="fade-down"
                >
                    <span className='border-b-4 border-emerald-400 pb-1'>How SikkhaHub Works</span>
                </motion.h2>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <WorkStep
                        number={1}
                        title="Register & Post"
                        description="Students post their detailed tuition needs. Tutors complete their profiles with qualifications."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 group-hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="21" x2="18" y2="10"/><line x1="23" y1="14" x2="18" y2="10"/><line x1="13" y1="14" x2="18" y2="10"/>
                            </svg>
                        }
                    />
                    <WorkStep
                        number={2}
                        title="Connect & Apply"
                        description="Tutors apply for relevant posts. Students review applications, profiles, and interview potential candidates."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 group-hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 9 12 4 7 9"/><line x1="12" y1="4" x2="12" y2="16"/>
                            </svg>
                        }
                    />
                    <WorkStep
                        number={3}
                        title="Start & Track"
                        description="Once selected, the tuition starts. Use the dashboard for digital class tracking and automated payments."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 group-hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        }
                    />
                </motion.div>
            </section>

            {/* 5. Why Choose Us (features section) - AFTER How it Works */}
            <section className="py-14 max-w-7xl mx-auto px-4 border-t border-gray-700/50">
                <motion.h2 
                    className="text-4xl font-extrabold mb-12 text-center theme-secondary-text"
                    variants={headerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    data-aos="fade-up"
                >
                    <span className='border-b-4 border-yellow-400 pb-1'>Why Choose SikkhaHub?</span>
                </motion.h2>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <FeatureCard
                        title="Verified Tutors"
                        description="All tutors undergo a rigorous verification process, including background checks and credential validation."
                        delay={0}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        }
                    />
                    <FeatureCard
                        title="Transparent Payments"
                        description="Automated, secure payment processing ensures timely and transparent transactions for both parties."
                        delay={100}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="6" width="18" height="13" rx="2" ry="2"/>
                                <line x1="1" y1="10" x2="23" y2="10"/>
                                <polygon points="10 15 13 18 16 15"/>
                            </svg>
                        }
                    />
                    <FeatureCard
                        title="Digital Tracking"
                        description="Monitor class attendance, topics covered, and progress reports directly through your personalized dashboard."
                        delay={200}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        }
                    />
                    <FeatureCard
                        title="Role-Based Dashboards"
                        description="Get a customized view and tools based on whether you are a Student, Tutor, or Admin user."
                        delay={300}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="9"/>
                                <rect x="14" y="3" width="7" height="5"/>
                                <rect x="14" y="12" width="7" height="9"/>
                                <rect x="3" y="16" width="7" height="5"/>
                            </svg>
                        }
                    />
                    <FeatureCard
                        title="24/7 Support"
                        description="Our dedicated support team is available around the clock to assist with any platform or tuition issues."
                        delay={400}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8s8 3.58 8 8c0 4.42-3.58 8-8 8z"/>
                                <path d="M12 4v4"/>
                                <path d="M12 18v2"/>
                                <path d="M6.34 6.34l2.83 2.83"/>
                                <path d="M14.83 14.83l2.83 2.83"/>
                                <path d="M4 12h4"/>
                                <path d="M16 12h4"/>
                                <path d="M17.66 6.34l-2.83 2.83"/>
                                <path d="M9.17 14.83l-2.83 2.83"/>
                            </svg>
                        }
                    />
                    <FeatureCard
                        title="Quality Matchmaking"
                        description="Advanced algorithms help students and tutors find the most compatible match based on location, subject, and salary."
                        delay={500}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 17.65V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.35"/><path d="M18 10V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6"/><path d="M12 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><path d="M12 13v3h3"/>
                            </svg>
                        }
                    />
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;