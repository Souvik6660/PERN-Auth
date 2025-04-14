import React from 'react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/authService';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

 const [userData,setUserData]=useState({
  email:"",
  password:""
 });    
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleGoogleLogin = () => {
    console.log("Google Signup Clicked");
    window.location.href = "http://localhost:5000/auth/google";
  }; 

//   const loginHandler = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setUserData({ ...userData, [name]: value });
//   };

const loginHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(userData, dispatch);
      
      if (res.status === 'success') {
        toast.success(`Welcome ${res.data.fullname}`);
        navigate('/welcome');
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
    
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input onChange={loginHandler}
              id="email"
              type="email"
              name='email'
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={loginHandler}
              id="password"
              type="password"
              name='password'
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-200 mb-4"
          >
          <FcGoogle className="text-xl" /> {"  "}
            <span className="text-gray-700">Login with Google</span>
          </button>
          <p
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 hover:underline cursor-pointer"
          >
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
