import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { fieldsValidation } from '../validations';
import Form from '../Form/Form';
import './Register.scss';

export const Register = () => {
    const { register, logout, appUser } = useAuth();
    const history = useHistory();

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: '',
        successMessage: '',
    };

    const [data, setData] = useState(initialState);

    useEffect(() => {
        let timerFunc
        if (appUser && appUser.email) {
            timerFunc = setTimeout(function () {
                history.push("/login");
            }, 3000);
        }

        return () => clearTimeout(timerFunc);

    }, [appUser])

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: ''
        });

        const { email, password } = data;

        if (!fieldsValidation(email, password).isValid) {
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: fieldsValidation(email, password).errorMessage
            })
        } else {
            try {
                await register(email, password);
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: '',
                    successMessage: 'Success user has been created',
                })
            } catch {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: 'Failed to create account'
                })
            }

        }
    };

    return (
        <div className="register-container">
            <div className="register-container__card">
                <div className="register-container__form">
                    <Form
                        title="Register"
                        data={data}
                        handleFormSubmit={handleFormSubmit}
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
      Already have an account? Go to&nbsp;<Link to="/login">Login</Link>&nbsp;page.
        </div>
    );
};
export default Register;