// src/App.jsx

import { useState } from 'react';
import Navbar from './components/navbar'; 
// Fixed Imports: Only import Routes and Route
import { Routes, Route } from 'react-router-dom'; 

// --- Placeholder Components for Routes ---
const HomePage = () => <div className="p-8"><h1>Welcome Home!</h1><p>Tuition Management System Landing Page.</p></div>;
const TuitionsPage = () => <div className="p-8"><h1>Tuitions Listings</h1></div>;
const TutorsPage = () => <div className="p-8"><h1>Tutors Directory</h1></div>;
const AboutPage = () => <div className="p-8"><h1>About Us</h1></div>;
const ContactPage = () => <div className="p-8"><h1>Contact Information</h1></div>;
const LoginPage = () => <div className="p-8"><h1>Login</h1></div>;
const RegisterPage = () => <div className="p-8"><h1>Register</h1></div>;
const DashboardPage = () => <div className="p-8"><h1>User Dashboard</h1></div>;
const ProfilePage = () => <div className="p-8"><h1>User Profile</h1></div>;
const SettingsPage = () => <div className="p-8"><h1>User Settings</h1></div>;
// ------------------------------------------

function App() {
  const [user, setUser] = useState(null); 

  return (
    <>
      <Navbar /> 
      
      <main className='min-h-screen'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tuitions" element={<TuitionsPage />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="*" element={<div className="p-8"><h1>404 Not Found</h1></div>} />
        </Routes>
      </main>
    </>
  )
}

export default App