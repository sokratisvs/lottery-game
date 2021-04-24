import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { fieldsValidation } from '../validations';
import Form from '../Form/Form';
import './Login.scss';

export const Login = () => {
  const { signin, logout, appUser } = useAuth();
  const history = useHistory();

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = useState(initialState);

  // we need to reset user from registration page
  // when they come to login page after successful creation of user
  useEffect(() => {
    const clearUserInLoginPage = async () => {
      await logout();
    }

    if(appUser && appUser.email) {
      clearUserInLoginPage();
    }
  }, [])

  // delay for 3 seconds before redirect user to draw page
  useEffect(() => {
    let timerFunc
    if (appUser && appUser.email) {
        timerFunc = setTimeout(function () {
          history.push("/");
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

  async function handleFormSubmit (event) {
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
            await signin(email, password);
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: '',
                successMessage: `Successfull login`,
            })
        } catch {
          // TODO: check if putting catch (err) and console log it
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Failed to sign in'
            })
        }

    }
};

  return (
    <div className="login-container">
      <div className="login-container__card">
        <div className="login-container__form">
          <Form
            title="Sign In"
            data={data}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      Don't have an account? Go to&nbsp;<Link to="/register">Register</Link>&nbsp;page.
    </div>
  );
};
export default Login;