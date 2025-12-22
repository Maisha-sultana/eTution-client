

import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

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

import PostNewTuition from './pages/dashboard/PostNewTuition'; 
import MyTuitions from './pages/dashboard/MyTuitions'; 
import AppliedTutors from './pages/dashboard/AppliedTutors'; 

import MyApplications from './pages/dashboard/MyApplications';
import OngoingTuitions from './pages/dashboard/OngoingTuitions';
import RevenueHistory from './pages/dashboard/RevenueHistory';

import UserManagement from './pages/dashboard/admin/UserManagement';
import TuitionManagement from './pages/dashboard/admin/TuitionManagement';
import AdminAnalytics from './pages/dashboard/admin/AdminAnalytics';


import PaymentSuccess from './pages/dashboard/PaymentSuccess';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TutorProfileSettings from './pages/dashboard/tutor/TutorProfileSettings';
import StudentProfile from './pages/dashboard/student/StudentProfile';
import ErrorPage from './pages/ErrorPage';
const TuitionsPage = () => {
    const [tuitions, setTuitions] = useState([]);
    const [search, setSearch] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTuitions, setTotalTuitions] = useState(0);
    const tuitionsPerPage = 6;

    useEffect(() => {
        // Fetch with search, filter, sort and pagination
        fetch(`https://e-tution-server-nine.vercel.app/all-tuitions?search=${search}&class=${filterClass}&location=${filterLocation}&sort=${sort}&page=${currentPage}&limit=${tuitionsPerPage}`)
        .then(res => res.json())
        .then(data => {
            setTuitions(data.result || []);
            setTotalTuitions(data.total || 0);
        });
    }, [search, filterClass, filterLocation, sort, currentPage]);

    const totalPages = Math.ceil(totalTuitions / tuitionsPerPage);

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold mb-8 theme-accent-text">All Tuitions</h1>
            
            {/* Search & Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <input 
                    type="text" 
                    placeholder="Search Subject..." 
                    className="input input-bordered bg-gray-700 text-white" 
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
                />
                <input 
                    type="text" 
                    placeholder="Filter Location..." 
                    className="input input-bordered bg-gray-700 text-white" 
                    onChange={(e) => { setFilterLocation(e.target.value); setCurrentPage(1); }} 
                />
               <select 
        className="select select-bordered bg-gray-700 text-white" 
        onChange={(e) => { setFilterClass(e.target.value); setCurrentPage(1); }}
    >
        <option value="">All Classes</option>
        <option value="Class 9">Class 9</option>
        <option value="Class 10">Class 10</option>
        <option value="HSC">HSC</option>
    </select>
                <select className="select select-bordered bg-gray-700 text-white" onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort By Price</option>
                    <option value="salaryLow">Low to High</option>
                    <option value="salaryHigh">High to Low</option>
                </select>
            </div>

            {/* Tuition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tuitions.map(t => (
                    <div key={t._id} className="card bg-gray-800 p-6 border-l-4 border-emerald-500 shadow-xl">
                        <h3 className="text-xl font-bold text-white">{t.subject}</h3>
                        <p className="text-gray-400">{t.classLevel} | {t.location}</p>
                        <p className="text-emerald-400 font-bold mt-2">{t.salary} BDT</p>
                        <Link to={`/tuition/${t._id}`} className="btn btn-sm mt-4 bg-yellow-400 border-none text-gray-900 font-bold">Details</Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 join">
                    {[...Array(totalPages).keys()].map(page => (
                        <button 
                            key={page} 
                            onClick={() => setCurrentPage(page + 1)}
                            className={`join-item btn ${currentPage === page + 1 ? 'btn-active bg-emerald-500' : 'bg-gray-700 text-white'}`}
                        >
                            {page + 1}
                        </button>
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
      {/*  PUBLIC ROUTES */}
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

      {/*  DASHBOARD ROUTES (Protected) */}
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
    <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
