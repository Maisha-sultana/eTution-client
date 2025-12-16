// src/App.jsx

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

// --- Placeholder Components for Routes (using theme classes) ---
// 👇️ ADDED: These components were missing and causing the "ReferenceError"
const HomePage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">Welcome Home!</h1>
        <p className='theme-text-light'>Tuition Management System Landing Page.</p>
    </div>
);
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

// Placeholder Dashboard Components for different roles
const StudentDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Student Dashboard Overview</h1><p className='theme-text-light'>View your specific student panels here.</p></div>;
const TutorDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Tutor Dashboard Overview</h1><p className='theme-text-light'>Manage your tutor profile and applications here.</p></div>;
const AdminDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">Admin Dashboard Overview</h1><p className='theme-text-light'>Manage system settings and users here.</p></div>;

const ProfilePage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">User Profile</h1></div>;
const SettingsPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4 theme-accent-text">User Settings</h1></div>;
// ------------------------------------------

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

            {/* Role-Specific Dashboard Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="tutor" element={<TutorDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />

            {/* Common Profile/Settings Routes (Nested under the role paths) */}
            <Route path=":role/profile" element={<ProfilePage />} />
            <Route path=":role/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      
      {/* Fallback 404 Route */}
      <Route path="*" element={<div className="p-8 theme-bg-dark text-white min-h-screen"><h1>404 Not Found</h1></div>} />
    </Routes>
  )
}

export default App