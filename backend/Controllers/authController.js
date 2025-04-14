import User from "../models/user.js";
import generateUUID from "../utils/generateUUID.js";
import bcrypt from "bcrypt";
import respond from "../utils/respond.js";
import { sendVerificationEmail } from "../utils/Email.js";
import generateToken from "../utils/generateToken.js";

// Sign Up
export const SignUp = async (req, res) => {
  try {
    const id = generateUUID();
    const { fullname, email, password } = req.body;

    // Check if all required fields are provided
    if (!fullname || !email || !password) {
      return respond(res, 400, "All fields are required!!");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return respond(res, 400, "User Already Exists, Please Login!!");
    }

    // ✅ Validate Password before processing
    if (!validatePassword(password)) {
      return respond(
        res,
        400,
        "Password must be at least 6 characters long, include one uppercase letter and one special character."
      );
    }

    if (!validateName(fullname)) {
      return respond(res, 400, "Name must be at least 3 characters long.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Create user
    const user = await User.create({
      id,
      fullname,
      email,
      password: hashedPassword,
      vOTP: verificationOTP,
      otpExpiresAt,
      isVerified: false,
    });

    // Send verification email
    await sendVerificationEmail(user.email, verificationOTP);

    // Generate authentication token
    const token = generateToken(user);

    // Send token in a cookie (1-hour expiration)
    res.cookie("token", token, { maxAge: 3600000 });

    return respond(
      res,
      201,
      "User created successfully. Check your email for OTP verification.",
      {
        id: user.id,
        name: user.fullname,
        email: user.email,
        isVerified: false,
      }
    );
  } catch (error) {
    console.error("SignUp Error:", error);
    return respond(
      res,
      500,
      "An error occurred while creating user",
      error.message
    );
  }
};

/*  ✅ Separate Password Validation Function */

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return regex.test(password);
};

/* name validation */
const validateName = (name) => {
  if (!name || name.length < 3) {
    return false;
  }
  return true;
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    // Ensure req.user exists
    if (!req.user || !req.user.email) {
      return respond(res, 400, "Session expired. Please sign up again.");
    }

    const { vOTP } = req.body;

    if (!vOTP) {
      return respond(res, 400, "Please enter the 6-digit OTP.");
    }

    // 2. Validate that the OTP is a 6-digit number
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(vOTP)) {
      return respond(res, 400, "Invalid OTP. It must be exactly 6 digits.");
    }

    // Find the user by OTP
    const user = await User.findOne({ where: { email: req.user.email } });

    // If no user found, OTP is either incorrect or expired
    if (!user) {
      return respond(res, 400, "OTP Expired , Please Sign Up again.");
    }

    if (user.vOTP !== vOTP) {
      return respond(res, 400, "Incorrect OTP,please recheck");
    }

    // Mark user as verified
    user.vOTP = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    return respond(res, 200, "Email verified successfully.", {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("verifyOtp Error:", error.message); // Log the actual error
    return respond(res, 500, `Internal Server Error: ${error.message}`);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return respond(res, 400, "All fields are required!!");
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return respond(res, 404, "User doesn't Exists");
    }

    // Check if user is verified
    if (!user.isVerified) {
      return respond(res, 403, "User not verified");
    }

    // Compare entered password with stored hash
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return respond(res, 400, "Invalid Credentials");
    }

    // Generate a token
    const token = generateToken(user);

    // Send token in a cookie
    res.cookie("token", token, { maxAge: 3600000 });

    const firstName = user.fullname.split(" ")[0];

    return respond(res, 200, `${firstName},logged in successfully`, {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,

    })
  } catch (error) {
    console.error("Login Error:", error);
    return respond(res, 500, "Something went wrong");
  }
};

// Forgot Password logic
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate the email format (optional but good practice)
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return respond(res, 400, "Please enter a valid email address.");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return respond(res, 400, "User not found, please recheck the email.");
    }

    // Generate OTP for email verification
    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Set OTP and expiration time
    user.vOTP = verificationOTP;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await user.save();

    // Send OTP via email
    const emailSent = await sendVerificationEmail(user.email, verificationOTP);

    if (!emailSent) {
      return respond(res, 500, "Failed to send OTP, please try again later.");
    }

    return respond(
      res,
      200,
      "OTP for resetting your password has been sent to your email, please check."
    );
  } catch (error) {
    console.error("Forgot password error: ", error.message);
    return respond(res, 500, "Something went wrong.");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { vOTP, newPassword } = req.body;

    // Ensure both fields are provided
    if (!vOTP || !newPassword) {
      return respond(res, 400, "All fields are required");
    }

    // Validate password strength
    if (!validatePassword(newPassword)) {
      return respond(
        res,
        400,
        "Password must be at least 6 characters long, include one uppercase letter and one special character."
      );
    }

    // Validate that the OTP is a 6-digit number
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(vOTP)) {
      return respond(res, 400, "Invalid OTP. It must be exactly 6 digits.");
    }

    // Find the user by the OTP
    const user = await User.findOne({ where: { vOTP } });
    if (!user) {
      return respond(res, 400, "Incorrect OTP");
    }

    // Check if the OTP is expired
    if (user.otpExpiresAt < Date.now()) {
      return respond(res, 400, "OTP Expired, please request again");
    }

    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.vOTP = null;
    user.otpExpiresAt = null;
    await user.save();

    return respond(res, 200, "Password reset successfully");
  } catch (error) {
    console.error("resetPassword error:", error);
    return respond(res, 500, "Something went wrong!");
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return respond(res, 200, "User Logged out Successfully");
  } catch (error) {
    console.error("Logout Error:", error);
    return respond(res, 500, "Something Went Wrong");
  }
};


// Get user Profile
// Get user Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    if (!userId) {
      return respond(res, 400, "User ID not found");
    }

    const user = await User.findByPk(userId, {
      attributes: ["_id", "fullname", "email", "phone","isVerified", "role", "profile"],
    });
    

    if (!user) {
      return respond(res, 200, "Failed to fetch user details");
    } else {
      return respond(res, 200, "User details fetched successfully", user);
    }
  } catch (error) {
    console.error("GetProfile Error", error);
    return respond(res, 500, "Something Went Wrong");
  }
};

