import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { validateUserAuth } from '../utils/validators';

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserAuthenticated = validateUserAuth();
    if (isUserAuthenticated) {
      navigate('/user/profile');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isLoginForm) {
      const username = usernameRef.current.value;
      try {
        const data = await axios.post(
          BASE_URL + '/auth/signup',
          {
            emailId: email,
            password: password,
            userName: username,
          },
          { withCredentials: true }
        );
        if (data) {
          navigate('/auth');
          setIsLoginForm(true);
        }
      } catch (err) {
        setErrorMessage('Invalid credentials');
      }
    } else {
      try {
        const data = await axios.post(
          BASE_URL + '/auth/login',
          {
            emailId: email,
            password: password,
          },
          { withCredentials: true }
        );
        const token = data?.data?.token;
        Cookies.set('token', token, { expires: 1 });
        dispatch(addUser(data?.data?.user));
        return navigate('/user/profile');
      } catch (err) {
        setErrorMessage('Invalid credentials');
      }
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md px-6 py-8 bg-black bg-opacity-50 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-6">
          {isLoginForm ? 'Login' : 'Sign Up'}
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLoginForm && (
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter username"
              className="w-full p-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          )}
          <input
            ref={emailRef}
            type="text"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            {isLoginForm ? 'Login' : 'Sign Up'}
          </button>
          <p
            className="text-center text-sm text-gray-400 cursor-pointer hover:text-white"
            onClick={toggleForm}
          >
            {isLoginForm
              ? 'New to Alumni Connect? Sign Up Now'
              : 'Already registered? Login'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
