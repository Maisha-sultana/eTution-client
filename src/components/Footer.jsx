
import React from 'react';
import { Link } from 'react-router-dom';

const websiteName = "SikkhaHub"; 

const AbstractIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-7 h-7 mr-1 theme-accent-text" 
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 0a2.25 2.25 0 002.25 2.25h12.75M3.75 12a2.25 2.25 0 012.25-2.25h12.75M16.5 7.5l2.25 4.5m-2.25-4.5l-2.25 4.5m4.5-4.5v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12L21 7.5M16.5 12L21 16.5" />
    </svg>
);

const Footer = () => {

  const linkClasses = "link link-hover transition-colors duration-200 hover:text-emerald-400";
  const iconClasses = "theme-accent-text hover:text-yellow-400 transition-colors duration-200";

  return (
   
    <footer className="theme-bg-dark border-t border-emerald-400/20 pt-6 pb-0">
      
      <div className="max-w-7xl mx-auto px-4 py-3 theme-text-light text-center md:text-left grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        
        {/* Logo & About Platform */}
        <div className="col-span-2 md:col-span-1 mx-auto md:mx-0">
          {/* Reduced mb-2 to mb-1 */}
          <Link to="/" className="flex items-center justify-center md:justify-start mb-1">
            <AbstractIcon />
            <span className="text-2xl font-extrabold tracking-wider">
              <span className="theme-secondary-text">{websiteName.slice(0, 4)}</span>
              <span className="text-gray-50">{websiteName.slice(4)}</span>
            </span>
          </Link>
       
          <p className="max-w-xs text-xs"> 
            SikkhaHub is the complete platform designed to connect qualified tutors with verified tuition needs, enabling digital tracking and transparent payments.
          </p>
        </div>

        <nav className="flex flex-col gap-0 items-center md:items-start">
          <header className="theme-accent-text font-bold text-base mb-1">Quick Links</header>
          <Link to="/" className={linkClasses + " text-sm py-0"}>Home</Link>
          <Link to="/tuitions" className={linkClasses + " text-sm py-0"}>Tuitions</Link>
          <Link to="/tutors" className={linkClasses + " text-sm py-0"}>Tutors</Link>
          <Link to="/about" className={linkClasses + " text-sm py-0"}>About Us</Link>
          <Link to="/dashboard" className={linkClasses + " text-sm py-0"}>Dashboard</Link>
        </nav>
        
        <nav className="flex flex-col gap-0 items-center md:items-start">
          <header className="theme-accent-text font-bold text-base mb-1">Contact</header>
          <a href="mailto:support@sikshahub.com" className={linkClasses + " text-sm py-0"}>Email: support@sikshahub.com</a>
          <p className="text-sm">Phone: +880 17XX XXX XXX</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>
        </nav>

        <nav className="flex flex-col gap-0 items-center md:items-start">
            <header className="theme-accent-text font-bold text-base mb-1">Connect</header>
            <div className="grid grid-flow-col gap-3">
                {/* X Logo (formerly Twitter) */}
                <a href="#" aria-label="X (formerly Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}>
                        <path d="M18.9 4.8c-.8.3-1.6.5-2.4.6.9-.6 1.6-1.4 1.9-2.5-.9.5-1.9.9-2.9 1.1-.8-.8-1.9-1.3-3.2-1.3-2.4 0-4.4 2-4.4 4.4 0 .3.03.6.1.9C6.1 8.8 3.2 7.2 1.3 4.6c-.3.5-.5 1-.5 1.6 0 1.2.6 2.3 1.5 2.9-.8-.03-1.5-.2-2.1-.6v.05c0 2.2 1.6 4 3.7 4.4-.4.1-.9.2-1.4.2-.3 0-.7-.03-1-.1.6 1.9 2.3 3.3 4.4 3.4-1.6 1.3-3.6 2-5.7 2-.4 0-.8-.03-1.2-.1C3.3 19 6.8 20 10.7 20c7.8 0 12-6.5 12-12.2 0-.2 0-.4-.03-.6.8-.6 1.5-1.4 2-2.3z"/>
                    </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}>
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.21 0-4.192 1.543-4.192 4.615v3.385z"></path>
                    </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}>
                        <path d="M12 2c2.757 0 3.084.01 4.16.06c1.066.05 1.748.24 2.227.425.67.258 1.118.59 1.61.59s.94-.332 1.61-.59c.48-.185 1.16-.375 2.227-.425 1.076-.05 1.403-.06 4.16-.06s3.084.01 4.16.06c1.066.05 1.748.24 2.227.425.67.258 1.118.59 1.61.59s.94-.332 1.61-.59c.48-.185 1.16-.375 2.227-.425 1.076-.05 1.403-.06 4.16-.06M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm5.7-8.8c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2z"></path>
                    </svg>
                </a>
            </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 border-t border-gray-700/50 mt-2 pt-2 theme-text-light text-center">
        <p className="text-xs">Copyright © {new Date().getFullYear()} - All right reserved by {websiteName} LTD.</p>
      </div>
    </footer>
  );
};

export default Footer;