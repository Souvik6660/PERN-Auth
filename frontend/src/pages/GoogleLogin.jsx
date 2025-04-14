import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { SignupUser } from "../Service/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signup = () => {
  
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await SignupUser(formData, dispatch);
  
      if (response.status === "success") {
        toast.success("Please verify your email address");
        navigate("/verify-otp");
      } else {
        toast.error(response.message || "Oops! SignUp Failed! Try again later");
      }
    } catch (error) {
      console.error("Signup Error:", error);
  
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
      
      toast.error(errorMessage);
    }
  };
  
  const handleGoogleSignup = () => {
    console.log("Google Signup Clicked");
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input autoComplete="off"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input autoComplete="off"
            type="email" 
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input autoComplete="off"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">or</div>
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle className="text-xl" /> Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
