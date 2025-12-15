// src/App.jsx

import { useState } from 'react';
// Import Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import DashboardPage from './pages/Dashboard'; 
import RegisterPage from './pages/RegisterPage';

// --- Placeholder Components for Routes (using theme classes) ---
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
const LoginPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 theme-accent-text">Login</h1>
        <p className='theme-text-light'>Access your account.</p>
    </div>
);

const ProfilePage = () => <div className="p-8"><h1>User Profile</h1></div>;
const SettingsPage = () => <div className="p-8"><h1>User Settings</h1></div>;
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

      {/* 2. DASHBOARD ROUTES (Uses specialized layout, without Footer) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} /> 
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Fallback 404 Route */}
      <Route path="*" element={<div className="p-8 theme-bg-dark text-white min-h-screen"><h1>404 Not Found</h1></div>} />
    </Routes>
  )
}

export default App