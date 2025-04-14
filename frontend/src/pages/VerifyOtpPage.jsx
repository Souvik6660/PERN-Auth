import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { otpVerify } from '../Service/authService';
import { useDispatch } from 'react-redux';

const VerifyOtpPage = () => {
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  // Handle OTP verification on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timer === 0) {
      toast.error('OTP expired, please try again');
      return;
    }
    if (otpCode.length < 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }
    try {
      const response = await otpVerify(otpCode, dispatch);
      if (response.status === "success") {
        toast.success('OTP verified successfully');
        navigate('/success-login');
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const errorMessage = error?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the 6-digit code sent to your email or phone.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              maxLength="6"
              value={otpCode}
              onChange={(e) => {
                // Allow only numbers
                if (/^\d*$/.test(e.target.value)) {
                  setOtpCode(e.target.value);
                }
              }}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded px-4 py-2 text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="text-center mb-4">
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
          <button
            type="submit"
            disabled={timer === 0}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 ${
              timer === 0 && 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Verify OTP
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

export default VerifyOtpPage;
