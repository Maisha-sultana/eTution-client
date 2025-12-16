// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import AuthProvider from './contexts/AuthContext.jsx' 
import 'aos/dist/aos.css'; // 👈️ NEW: Import AOS CSS
import AOS from 'aos';     // 👈️ NEW: Import AOS library

// NEW: Initialize AOS outside the component tree
AOS.init({
  duration: 1000, // global duration
  once: true,     // whether animation should happen only once - default
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables routing */}
    <BrowserRouter>
      {/* AuthProvider makes user state available everywhere */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)