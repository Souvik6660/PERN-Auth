import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing React icon for default user profile

import toast from "react-hot-toast";
import { logOutUser } from '../Service/authService';
import { logoutSuccess } from '../redux/authSlice';

function Welcome() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = async () => {
    try {
      const result = await logOutUser();  // call logout function
      if (result.status === 'success') {
        toast.success(result.message);
        dispatch(logoutSuccess());  // dispatch logout success action
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to log out. Please try again later');
    }
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Well Done, {user?.fullname || 'Guest'}!</h1>
        
        <div className="flex justify-center mb-6">
          {/* Conditional rendering for profile image or default icon */}
          {user?.profileImage ? (
            <img
              src={`${user.profileImage}`}
              alt="user profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-600 object-cover"
            />
          ) : (
            <FaUserCircle size={96} className="text-indigo-600" />
          )}
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.fullname || 'Guest'}</h2>
        <p className="text-gray-600 text-lg mb-4">{user?.email}</p>
        
        <div className="bg-indigo-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto">
          <span className="text-lg">Your account is successfully verified!</span>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => alert('Feature coming soon!')}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Explore Dashboard
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
