// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, // <--- NEW IMPORT
    GoogleAuthProvider,        // <--- NEW IMPORT
    signInWithPopup,           // <--- NEW IMPORT
    signOut,                   // <--- NEW IMPORT
    updateProfile 
} from 'firebase/auth'; 
import { auth } from '../firebase/firebase.init'; 

// 1. Create the Context
export const AuthContext = createContext(null);

// 2. Custom hook to use the context easily
export const useAuth = () => {
    return useContext(AuthContext);
};

// --- Helper: Save/Update user profile in MongoDB and get JWT ---
const getJwtToken = async (email) => {
    // 1. Get JWT Token from Backend
    const response = await fetch('http://localhost:3000/jwt', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    });

    if (response.ok) {
        const data = await response.json();
        // 2. Store Token in Local Storage (for subsequent requests)
        localStorage.setItem('access-token', data.token);
        console.log('JWT Token received and stored.');
    } else {
        console.error("Failed to fetch JWT Token.");
    }
};


// Helper function to save new user to DB (called during registration or first-time social login)
const saveUserToDb = async (user, phone = null, role = 'Student') => {
    const userToSave = {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        phone: phone, 
        role: role, // Default role "Student" for Google Login
        createdAt: new Date(),
    };

    const response = await fetch('http://localhost:3000/users', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToSave),
    });

    if (!response.ok) {
        console.error("Failed to save user profile to database.");
    }
};

// 3. The Provider Component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // --- Authentication Methods ---
    
    // 1. Email & Password Registration (Updated to get JWT)
    const createUser = async (email, password, name, phone, role) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(result.user, {
            displayName: name,
        });

        await saveUserToDb(result.user, phone, role);
        
        await getJwtToken(result.user.email); // Get JWT
        return result;
    };

    // 2. Email & Password Login <--- NEW
    const logIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        
        await getJwtToken(result.user.email); // Get JWT
        
        return result;
    };

    // 3. Google Sign-In <--- NEW
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        
        await saveUserToDb(result.user, null, 'Student'); // Save with default role "Student"
        
        await getJwtToken(result.user.email); // Get JWT
        
        return result;
    };

    // 4. Logout <--- NEW
    const logOut = () => {
        localStorage.removeItem('access-token');
        return signOut(auth);
    };

    // Set up the listener for Firebase Authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('User state changed:', currentUser);
            setUser(currentUser);
            
            // Re-fetch token on refresh if needed
            if (currentUser && !localStorage.getItem('access-token')) {
                await getJwtToken(currentUser.email);
            }

            setLoading(false); // Authentication check is complete
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);
    
    const authInfo = {
        user,
        loading,
        createUser,
        logIn,      
        googleSignIn, 
        logOut,     
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;