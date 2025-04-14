import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../Service/authService";
import toast from "react-hot-toast";
function SuccessLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
     const urRight= await fetchUserProfile(dispatch); // Pass dispatch here
     console.log("Congrats ",urRight.data.email);
     
      navigate("/welcome");
    } catch (error) {
      console.error("Google auth failed", error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [navigate]); 

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default SuccessLogin;
