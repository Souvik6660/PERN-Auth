import { authFailure, authRequest, authSuccess, logoutSuccess, verifyotpSuccess } from "../redux/authSlice";

import axiosInstance from "./urlService";

// const API_URL = "http://localhost:5000/api/v1/auth/profile";

export const fetchUserProfile = async (dispatch) => {
  // Pass dispatch
  dispatch(authRequest());

  try {
    const response = await axiosInstance.get('/auth/profile');

    console.log(response.data);

    dispatch(authSuccess(response.data.data));
    return response.data;
  } catch (error) {
    dispatch(authFailure(error.response?.data || "An error occurred"));
    throw error.response?.data || "An error occurred";
  }
};


//login service

export const loginUser = async(userData,dispatch)=>{
  dispatch(authRequest());
  try {
      const response= await axiosInstance.post('/auth/login',userData)
      dispatch(authSuccess(response.data.data))
      return response.data;
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Something went wrong"));
    throw error.response?.data; // This ensures the function still throws the error
     
      
  }
}

// Signup logic 

export const SignupUser=async(formData,dispatch)=>{
  dispatch(authRequest());
  try {
    const response=await axiosInstance.post('/auth/signup', {
      fullname: formData.fullName, 
      email: formData.email,
      password: formData.password,
    });
    dispatch(authSuccess(response.data.data));
    return response.data;
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Something went wrong"));
    throw error.response?.data; // This ensures the function still throws the error
    
  }

}

// Verify OTP page

export const otpVerify=async(otpData,dispatch)=>{
  dispatch(authRequest());
  try {
    const response=await axiosInstance.post('/auth/verify-otp',{vOTP:otpData});
    dispatch(verifyotpSuccess());
    return response.data;

} catch (error) {
  dispatch(authFailure(error.response?.data?.message || "Something went wrong"));
  throw error.response?.data; // This ensures the function still throws the error
}
}


//forgot password logic
export const forgotPassword=async(email)=>{
  try {
    const response= await axiosInstance.post('/auth/forgotpassword',email)
    return response.data;
} catch (error) {
    throw error?.response?.data ||"something went wrong in authservice";
}
}


//user reset password
export const resetPassword = async (otp, newPass) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', {
      vOTP: otp,
      newPassword: newPass,
    });
    return response.data;
  } catch (error) {
    // Handle error properly by throwing the response data
    throw error.response?.data || { message: "An unexpected error occurred" };
  }
};














//logout logic 
export const logOutUser=async()=>{
  try {
    const response = await axiosInstance.get('/auth/logout');
    if (response.status === 200) {
      return response.data;  // return data from the response
    }
  } catch (error) {
    throw error.response.data;  // handle error and throw it for further handling
  }

}
