// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import AuthProvider from './contexts/AuthContext.jsx' // New Import

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