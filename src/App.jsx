// src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Import Pages
import DashboardPage from './pages/Dashboard'; 
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 
import ProtectedRoute from './routes/ProtectedRoute'; 
import HomePage from './pages/HomePage'; 
import TuitionDetails from './pages/TuitionDetails';
import TutorsPage from './pages/TutorsPage';

// Import Student Dashboard Pages
import PostNewTuition from './pages/dashboard/PostNewTuition'; 
import MyTuitions from './pages/dashboard/MyTuitions'; 
import AppliedTutors from './pages/dashboard/AppliedTutors'; 

// Import Tutor Dashboard Pages
import MyApplications from './pages/dashboard/MyApplications';
import OngoingTuitions from './pages/dashboard/OngoingTuitions';
import RevenueHistory from './pages/dashboard/RevenueHistory';

// Import Admin Dashboard Pages
import UserManagement from './pages/dashboard/admin/UserManagement';
import TuitionManagement from './pages/dashboard/admin/TuitionManagement';
import AdminAnalytics from './pages/dashboard/admin/AdminAnalytics';

// Shared Dashboard Pages
import PaymentSuccess from './pages/dashboard/PaymentSuccess';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TutorProfileSettings from './pages/dashboard/tutor/TutorProfileSettings';
import StudentProfile from './pages/dashboard/student/StudentProfile';

const TuitionsPage = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Backend থেকে ডেটা ফেচ করা
        fetch('https://e-tution-server-nine.vercel.app/all-tuitions')
        .then(res => res.json())
        .then(data => {
            setTuitions(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error:", err);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20 theme-bg-dark min-h-screen">
            <span className="loading loading-spinner loading-lg text-emerald-400"></span>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 theme-accent-text border-b-2 border-emerald-400 pb-2 inline-block">
                All Tuitions Listings
            </h1>
           
            {tuitions.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No tuition posts available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tuitions.map((tuition) => (
                        <div key={tuition._id} className="p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-emerald-500/80 hover:border-emerald-400 transition duration-300">
                            <h3 className="text-xl font-bold theme-accent-text mb-2">{tuition.subject}</h3>
                            <p className="text-sm text-gray-400 mb-3">{tuition.classLevel} | {tuition.location}</p>
                            <div className="space-y-1 mb-4">
                                <p className="text-gray-300 text-sm"><span className="font-semibold">Salary:</span> {tuition.salary}</p>
                                <p className="text-gray-300 text-sm"><span className="font-semibold">Type:</span> {tuition.type}</p>
                            </div>
                            <Link to={`/tuition/${tuition._id}`} className="btn btn-sm bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-none">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProfileSettings = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Profile Settings</h1></div>;

// Dashboard Overview Components
const StudentDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Student Dashboard Overview</h1></div>;
const TutorDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Tutor Dashboard Overview</h1></div>;

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tuition/:id" element={<TuitionDetails />} />
        <Route path="tuitions" element={<TuitionsPage />} />
        <Route path="tutors" element={<TutorsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} /> 
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* 2. DASHBOARD ROUTES (Protected) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} /> 

            {/* Student Dashboard Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="student/my-tuitions" element={<MyTuitions />} /> 
            <Route path="student/post-tuition" element={<PostNewTuition />} /> 
            <Route path="student/applied-tutors" element={<AppliedTutors />} />
            <Route path="student/payment-success" element={<PaymentSuccess />} />
            <Route path="student/profile" element={<StudentProfile />} />

            {/* Tutor Dashboard Routes */}
           <Route path="tutor" element={<TutorDashboard />} />
            <Route path="tutor/profile" element={<TutorProfileSettings />} /> {/* Updated */}
            <Route path="tutor/applications" element={<MyApplications />} />
            <Route path="tutor/ongoing" element={<OngoingTuitions />} /> 
            <Route path="tutor/revenue" element={<RevenueHistory />} />
            {/* Admin Dashboard Routes */}
            <Route path="admin" element={<AdminAnalytics />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/tuitions" element={<TuitionManagement />} />

            {/* Common Profile Routes */}
            <Route path=":role/profile" element={<ProfileSettings />} /> 
            <Route path=":role/settings" element={<ProfileSettings />} /> 
        </Route>
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<div className="p-8 theme-bg-dark text-white min-h-screen"><h1>404 Not Found</h1></div>} />
    </Routes>
  );
}

export default App;
