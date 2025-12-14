// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you will use React Router for navigation

// Placeholder User Data (replace with actual Firebase Auth logic later)
const mockUser = {
  loggedIn: true, // Set to 'false' to test the Logged Out view
  name: 'Admin User',
  photoURL: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder image
};

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
  // In a real app, this would come from a Context or Redux store
  const user = mockUser.loggedIn ? mockUser : null;
  const websiteName = "Tuition Manager"; // Your Website Name

  return (
    // 'navbar-sticky' class from DaisyUI is not standard.
    // We use a standard Tailwind 'sticky' class and 'top-0' to make it stick to the top.
    // 'z-10' ensures it stays above other content.
    <div className="navbar bg-base-100 sticky top-0 z-10 shadow-md">
      {/* 1. Mobile/Tablet Dropdown Menu (Hamburger) - Visible on small screens */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
            {/* Auth-based links for mobile */}
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              // If logged in, show Dashboard link separately in mobile menu
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
          </ul>
        </div>
        
        {/* Logo & Website Name */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
            {/* You can add an <img> tag for your logo here */}
            {websiteName}
        </Link>
      </div>

      {/* 2. Desktop Navigation Links - Hidden on small screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* 3. Authentication Links (Navbar End) */}
      <div className="navbar-end">
        {user ? (
          // IF LOGGED IN: Dashboard + Profile Dropdown
          <>
            <Link to="/dashboard" className="btn btn-ghost hidden md:flex">Dashboard</Link>
            <div className="dropdown dropdown-end ml-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt={user.name} src={user.photoURL} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          // IF LOGGED OUT: Login / Register Buttons
          <div className='flex gap-2'>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;