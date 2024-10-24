import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {BASE_URL} from '../utils/constants'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { validateUserAuth } from '../utils/validators';
const Login = () => {
    const emailRef = useRef(null);
    const usernameRef = useRef(null)
    const passwordRef = useRef(null);
    

    const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
        if(!isLoginForm) {
        const username = usernameRef.current.value;
            try {
                const data = await axios.post(BASE_URL+"/auth/signup", {
                  emailId:email, password:password, userName:username
                }, {withCredentials: true});
                if(data){
                  navigate('/auth');
                  setIsLoginForm(true);
                }
            } catch (err) {
              setErrorMessage( "Invalid credentials");
                
            }
        }else{
            try {
                const data = await axios.post(BASE_URL + "/auth/login", {
                    emailId:email, password:password
                },{ withCredentials: true });
                const token = data?.data?.token;
                Cookies.set("token", token, {expires:1});
                return navigate("/user/profile");
            } catch (err) {
                setErrorMessage("Invalid credentials");
                
            }
        }
        
    }
    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center  items-center  bg-black text-wrap  inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] gap-4 font-[Poppins]">
        <form
        className="absolute bg-black w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 my-36 mx-auto right-0 left-0 p-8 sm:p-10 md:p-12 text-white bg-opacity-30 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl my-3">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        {!isLoginForm && (
          <>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            className="p-2 my-2 w-full bg-gray-900 rounded-sm"
          />
          </>
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-900 rounded-sm"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-900 rounded-sm"
        />
        {errorMessage && (
          <p className="text-red-600 py-4 font-semibold text-sm sm:text-base md:text-lg">
            {errorMessage}
          </p>
        )}
        <button
          className="py-2 bg-white text-black w-full rounded-sm my-2 text-lg font-bold"
          onClick={handleLogin}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer"
          onClick={toggleForm}
        >
          {isLoginForm
            ? "New to Alumini Connect? Sign Up Now"
            : "Already registered? Login"}
        </p>
      </form>
    </div>
  )
}

export default Login