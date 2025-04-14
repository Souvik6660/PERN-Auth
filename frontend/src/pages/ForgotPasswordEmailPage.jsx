import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { forgotPassword } from '../Service/authService';
const ForgotPasswordEmailPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const result = await forgotPassword({ email }); // sending email as an object
      if (result.status === "success") {
        toast.success(`Password reset OTP sent successfully`);
        navigate('/reset-password');
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error?.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleRequest}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Request
          </button>
        </form>
        <p
          onClick={() => navigate('/login')}
          className="mt-4 text-sm text-blue-500 hover:text-red-400 cursor-pointer text-center"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordEmailPage;
