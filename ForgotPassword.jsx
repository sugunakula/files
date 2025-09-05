import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get email from previous page (Login)
  const emailFromLogin = location.state?.email || "";
  const [formData, setFormData] = useState({
    email: emailFromLogin,
    favouriteSport: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Email is required.");
      return;
    }
    if (!formData.favouriteSport) {
      alert("Favourite sport is required.");
      return;
    }
    if (!formData.password || !formData.confirmPassword) {
      alert("Password and confirm password are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:8085/api/auth/forgot-password", {
        email: formData.email,
        favouriteSport: formData.favouriteSport,
        password: formData.password
      });
      alert("Password reset successful! Please login with your new password.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
          <div className="login-title">Reset Password</div>
          <div className="login-description">Enter your details to reset your password</div>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  required
                  readOnly={!!emailFromLogin}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="favouriteSport">Favourite Sport</label>
              <div className="input-wrapper">
                <input
                  id="favouriteSport"
                  type="text"
                  placeholder="Enter your favourite sport"
                  value={formData.favouriteSport}
                  onChange={e => handleInputChange("favouriteSport", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={e => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
