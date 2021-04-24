import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
    const { appUser, logout } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('')

    if (!appUser) {
        history.push("/register")
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Filed to logout');
        }
    }

    return (
        <>
            <h1>HOME</h1>
            <p>Email: {appUser && appUser.email}</p>
            <button onClick={handleLogout}>
                Log out
            </button>
        </>
    );
}