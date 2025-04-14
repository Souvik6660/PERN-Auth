import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleLogin from "./pages/GoogleLogin";
import SuccessLogin from "./pages/Successlogin";
import Welcome from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordEmailPage from "./pages/ForgotPasswordEmailPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/success-login" element={<SuccessLogin />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordEmailPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
