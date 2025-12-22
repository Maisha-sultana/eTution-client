// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider,        
    signInWithPopup,           
    signOut,                   
    updateProfile 
} from 'firebase/auth'; 
import { auth } from '../firebase/firebase.init'; 

export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

// --- Helper: Get JWT Token ---
const getJwtToken = async (email) => {
    const response = await fetch('https://e-tution-server-nine.vercel.app/jwt', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access-token', data.token);
    }
};

// --- Helper: Save User to DB (Role Based) ---
const saveUserToDb = async (user, phone = null, role = 'Student') => {
    const userToSave = {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        phone: phone, 
        role: role, 
        createdAt: new Date(),
    };

    await fetch('https://e-tution-server-nine.vercel.app/users', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToSave),
    });

   
    if (role === 'Tutor') {
        const tutorData = {
            tutorEmail: user.email,
            name: userToSave.name,
            photo: user.photoURL || 'https://via.placeholder.com/150',
            university: 'Not Updated',
            specialization: 'Not Updated',
            experience: '0 years',
            createdAt: new Date() 
        };

        await fetch('https://e-tution-server-nine.vercel.app/tutor-profile-update', { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tutorData),
        });
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const createUser = async (email, password, name, phone, role) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await saveUserToDb(result.user, phone, role);
        await getJwtToken(result.user.email);
        return result;
    };

    const logIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await getJwtToken(result.user.email);
        return result;
    };

    const googleSignIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        await saveUserToDb(result.user, null, 'Student');
        await getJwtToken(result.user.email);
        return result;
    };

    // ৪. লগআউট
    const logOut = () => {
        localStorage.removeItem('access-token');
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser && !localStorage.getItem('access-token')) {
                await getJwtToken(currentUser.email);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    const authInfo = { user, loading, createUser, logIn, googleSignIn, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;