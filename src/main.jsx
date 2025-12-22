
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import AuthProvider from './contexts/AuthContext.jsx' 
import 'aos/dist/aos.css'; 
import AOS from 'aos';     

AOS.init({
  duration: 1000, // global duration
  once: true,     
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <BrowserRouter>
    
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)