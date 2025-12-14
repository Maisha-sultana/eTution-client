// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.init'; // Import auth from your setup file

// 1. Create the Context
export const AuthContext = createContext(null);

// 2. Custom hook to use the context easily
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. The Provider Component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // Set up the listener for Firebase Authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('User state changed:', currentUser);
            setUser(currentUser);
            setLoading(false); // Authentication check is complete
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);
    
    // Auth functions will be added here later (e.g., login, logout)
    const authInfo = {
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {/* Wait until Firebase confirms the user state before rendering the app */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;