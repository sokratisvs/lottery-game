import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [appUser, setAppUser] = useState();

    const register = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signin = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    // run only when component mounts
    useEffect(() => {
        // firebase method for when user authentication changes
        const authStateChangeMethod = auth.onAuthStateChanged(user => {
            setAppUser(user)
        })
        // component unmount
        return authStateChangeMethod
    }, [])

    const data = {
        appUser,
        register,
        signin,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
