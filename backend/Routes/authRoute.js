
import { Router } from 'express';
import { forgotPassword, getProfile, login, logout,  resetPassword,  SignUp, verifyOtp } from '../Controllers/authController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const router=Router();

router.post('/signup',SignUp);
router.post('/verify-otp',authMiddleware,verifyOtp);
router.post('/login',login);
router.get('/profile',authMiddleware,getProfile)
router.get('/logout',logout);
router.post('/forgotpassword',forgotPassword);
router.post('/reset-password',resetPassword);


export default router;