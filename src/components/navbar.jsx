

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext'; 

// Branding
const websiteName = "SikkhaHub"; 

const AbstractIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-7 h-7 theme-accent-text" 
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 0a2.25 2.25 0 002.25 2.25h12.75M3.75 12a2.25 2.25 0 012.25-2.25h12.75M16.5 7.5l2.25 4.5m-2.25-4.5l-2.25 4.5m4.5-4.5v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12L21 7.5M16.5 12L21 16.5" />
    </svg>
);


const navLinks = (
  <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/tuitions">Tuitions</Link></li>
    <li><Link to="/tutors">Tutors</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>
  </>
);

const Navbar = () => {
  const { user, loading, logOut } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
      logOut()
          .then(() => {
              navigate('/login');
              console.log('User logged out successfully');
          })
          .catch(error => {
              console.error('Logout failed:', error);
          });
  };
  
  if (loading) {
      return (
          <div className="navbar theme-bg-dark sticky top-0 z-10 shadow-md justify-center">
              <span className="loading loading-spinner loading-lg text-emerald-400"></span>
          </div>
      );
  }

  return (
    <div className="navbar sticky top-0 z-10 shadow-xl text-gray-50 
                    theme-bg-dark bg-opacity-95 backdrop-blur-md 
                    border-b border-emerald-400/30 transition-all duration-300">
      
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
        
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-gray-800 rounded-box w-52">
            {navLinks}
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
      
              <li><Link to="/dashboard">Dashboard</Link></li> 
            )}
          </ul>
        </div>
        
        {/* Logo & Website Name (Branding) */}
        <Link to="/" className="btn btn-ghost text-xl font-extrabold hover:bg-transparent tracking-wider">
            <AbstractIcon />
            <span className="theme-secondary-text">{websiteName.slice(0, 4)}</span>
            <span className="text-gray-50">{websiteName.slice(4)}</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 [&>li>a:hover]:bg-gray-800 [&>li>a:hover]:text-emerald-400 [&>li>a]:text-gray-50">
          {navLinks}
        </ul>
      </div>

      {/* Authentication Links (Navbar End) */}
      <div className="navbar-end">
        {user ? (
        
          <>
            <Link to="/dashboard" className="btn btn-ghost hidden md:flex hover:bg-gray-800 hover:text-emerald-400 text-gray-50">Dashboard</Link>
            <div className="dropdown dropdown-end ml-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-emerald-400"> 
                  <img alt={user.displayName || "User"} src={user.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-gray-800 rounded-box w-52">
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard/settings">Settings</Link></li>
                <li><a onClick={handleLogout} className='hover:bg-red-100'>Logout</a></li> 
              </ul>
            </div>
          </>
        ) : (
   
          <div className='flex gap-2'>
            <Link to="/login" className="btn btn-ghost text-emerald-400 hover:bg-gray-800 border-2 border-transparent hover:border-emerald-400/50 transition-colors duration-200">Login</Link>
            <Link to="/register" className="btn bg-emerald-500 text-gray-900 hover:bg-emerald-600 border-none font-semibold transition-colors duration-200">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;