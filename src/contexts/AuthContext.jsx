// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, // <--- NEW IMPORT
    updateProfile // <--- NEW IMPORT
} from 'firebase/auth'; // <--- UPDATED IMPORT
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

    // Firebase Authentication: Register New User
    const createUser = async (email, password, name, phone, role) => {
        // 1. Create user in Firebase Auth
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // 2. Update the user's profile (Name and potential PhotoURL)
        await updateProfile(result.user, {
            displayName: name,
            // photoURL: 'optional-photo-url'
        });

        // 3. Prepare user data for MongoDB storage
        const userToSave = {
            email: result.user.email,
            name: name,
            phone: phone,
            role: role,
            createdAt: new Date(),
        };

        // 4. Save user profile to database (Backend API Call)
        // NOTE: Replace with your actual deployed URL when ready
        const response = await fetch('http://localhost:3000/users', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToSave),
        });

        if (!response.ok) {
            console.error("Failed to save user profile to database.");
            // Optional: Handle error by deleting Firebase user if DB save fails
        }
        
        // Return the result object for the frontend to use
        return result;
    };
    
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
        createUser, // <--- UPDATED: Export the new function
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {/* Wait until Firebase confirms the user state before rendering the app */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;