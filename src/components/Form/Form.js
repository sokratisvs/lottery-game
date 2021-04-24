import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Form.scss';

export default function Form({
    title,
    data,
    handleInputChange,
    handleFormSubmit,
}) {
    const { appUser } = useAuth();
    const [hidden, setHidden] = useState(false);
    const { email, password, errorMessage, successMessage, isSubmitting } = data;

    // when component mounts display the error 
    useEffect(() => {
        let timerFunc
        if (successMessage || errorMessage) {
            timerFunc = setTimeout(function () {
                setHidden(true);
            }, 3000);
        }

        return () => clearTimeout(timerFunc);
    }, [successMessage, errorMessage])

    const buttonTitle = isSubmitting ? "Loading..." : title;
    return (
        <div className="form-container">
            <form className="form-container__form" onSubmit={handleFormSubmit}>
                <h1>{title}</h1>

                {successMessage && !hidden && (
                    <span className="form-container--success">{successMessage}</span>
                )}

                {errorMessage && !hidden && (
                    <span className="form-container--error">{errorMessage}</span>
                )}

                <label htmlFor="email">
                    Email Address
                    </label>
                <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                />
                <label htmlFor="password">
                    Password
                    </label>
                <input
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                    name="password"
                    id="password"
                />

                <button className="form-container__button" disabled={isSubmitting}>
                    {buttonTitle}
                </button>

            </form>
        </div>
    );
}