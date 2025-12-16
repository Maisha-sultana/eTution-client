// src/App.jsx (MODIFIED)

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Import Pages
import DashboardPage from './pages/Dashboard'; 
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 
import ProtectedRoute from './routes/ProtectedRoute'; 

// 👇️ IMPORT DYNAMIC HOME PAGE 
import HomePage from './pages/HomePage'; 

// 👇️ NEW IMPORTS: Student Dashboard Pages
import PostNewTuition from './pages/dashboard/PostNewTuition'; 
// 👇️ NEW IMPORT: MyTuitions component
import MyTuitions from './pages/dashboard/MyTuitions'; 


// --- Placeholder Components for Public Routes (from previous code) ---
const TuitionsPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">Tuitions Listings</h1>
        <p className='theme-text-light'>Browse available tuition posts here.</p>
    </div>
);
const TutorsPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">Tutors Directory</h1>
        <p className='theme-text-light'>Find qualified tutors near you.</p>
    </div>
);
const AboutPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">About Us</h1>
        <p className='theme-text-light'>Learn more about SikshaHub's mission.</p>
    </div>
);
const ContactPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">Contact Information</h1>
        <p className='theme-text-light'>Get in touch with our support team.</p>
    </div>
);
// ------------------------------------------

// --- Placeholder Components for Dashboard Pages (NEW Student Routes) ---
const AppliedTutors = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Applied Tutors</h1><p className='theme-text-light'>Applications received for your posts.</p></div>;
const Payments = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Payment History</h1><p className='theme-text-light'>Your history of payments.</p></div>;
const ProfileSettings = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Profile Settings</h1><p className='theme-text-light'>Update your personal information.</p></div>;

// Placeholder Dashboard Overviews for other roles
const StudentDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Student Dashboard Overview</h1><p className='theme-text-light'>View your specific student panels here.</p></div>;
const TutorDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Tutor Dashboard Overview</h1><p className='theme-text-light'>Manage your tutor profile and applications here.</p></div>;
const AdminDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Admin Dashboard Overview</h1><p className='theme-text-light'>Manage system settings and users here.</p></div>;


function App() {
  const [user, setUser] = useState(null); 

  return (
    <Routes>
      
      {/* 1. PUBLIC ROUTES (Uses Navbar and Footer) */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tuitions" element={<TuitionsPage />} />
        <Route path="tutors" element={<TutorsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} /> 
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* 2. DASHBOARD ROUTES (Protected and Role-Based) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<ProtectedRoute />}>
            
            <Route index element={<DashboardPage />} /> 

            {/* Role-Specific Dashboard Overview Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="tutor" element={<TutorDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />

            {/* Student Dashboard Specific Pages (NEW ROUTES) */}
            <Route path="student/my-tuitions" element={<MyTuitions />} /> {/* <--- UPDATED */}
            <Route path="student/post-tuition" element={<PostNewTuition />} /> 
            <Route path="student/applied-tutors" element={<AppliedTutors />} />
            <Route path="student/payments" element={<Payments />} />

            {/* Common Profile/Settings Routes (Nested under the role paths) */}
            <Route path=":role/profile" element={<ProfileSettings />} /> 
            <Route path=":role/settings" element={<ProfileSettings />} /> 
        </Route>
      </Route>
      
      {/* Fallback 404 Route */}
      <Route path="*" element={<div className="p-8 theme-bg-dark text-white min-h-screen"><h1>404 Not Found</h1></div>} />
    </Routes>
  )
}

export default App