import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { resetPassword } from '../Service/authService';
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (timer === 0) {
     toast.error('OTP expired, please try again');
      return;
    }
    // Add your OTP and password reset logic here
    
  // Proceed with password reset logic
  try {
    const result = await resetPassword(otp, newPassword);
    if (result.status === "success") {
      toast.success("Password Reset Successfully");
      navigate('/login');
    }
  } catch (error) {
    console.error(error?.message || "Something went wrong");
    toast.error(error?.message || "Something went wrong");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="otp">
              Enter 6-Digit OTP
            </label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={timer === 0}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                timer === 0 ? 'bg-gray-200 cursor-not-allowed' : 'focus:ring-green-400'
              }`}
              placeholder="Enter OTP"
            />
          </div>
          <div className="mb-2">
            {timer > 0 ? (
              <span className="text-sm text-gray-600">
                OTP expires in: <span className="font-semibold">{formatTime(timer)}</span>
              </span>
            ) : (
              <span className="text-sm text-red-500 font-semibold">
                OTP expired, please try again.
              </span>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={timer === 0}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                timer === 0 ? 'bg-gray-200 cursor-not-allowed' : 'focus:ring-green-400'
              }`}
              placeholder="Enter your new password"
            />
          </div>
          <button
            type="submit"
            disabled={timer === 0}
            className={`w-full ${
              timer === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold py-2 rounded-md transition duration-200`}
          >
            Submit
          </button>
        </form>
        <p
          onClick={() => navigate('/login')}
          className="mt-4 text-sm text-blue-500 hover:underline cursor-pointer text-center"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
