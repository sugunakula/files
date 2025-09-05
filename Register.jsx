import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, User, Phone } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import logo from "@/assets/loan-logo.png";
import axios from 'axios';
import { useAuth } from "@/contexts/AuthContext";
import "./Register.css";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    favouriteSport: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    const phonePattern = /^[6-9][0-9]{9}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;'<>.,?\-]).+$/;
    const namePattern = /^[A-Za-z\s]+$/;

    switch (field) {
      case "username":
        if (!namePattern.test(value)) return "Full name should contain only letters and spaces.";
        break;
      case "email":
        if (!emailPattern.test(value)) return "Enter a valid Gmail address.";
        break;
      case "phone":
        if (!phonePattern.test(value)) return "Enter a valid phone number starting with 6-9 and 10 digits long.";
        break;
      case "password":
        if (!passwordPattern.test(value)) return "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
        break;
      case "confirmPassword":
        if (value !== formData.password) return "Passwords don't match!";
        break;
      case "favouriteSport":
        if (!/^[A-Za-z\s]+$/.test(value)) return "Favourite sport should contain only letters and spaces.";
        if (!value.trim()) return "Favourite sport is required.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
    // For confirmPassword, check instantly against password
    if (field === "password" && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", formData.confirmPassword)
      }));
    }
  };

  const { login } = useAuth(); // Add this inside your component

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){2,29}@gmail\.com$/;
    const phonePattern = /^[6-9][0-9]{9}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;'<>.,?\-]).{6,15}$/;
    const namePattern = /^[A-Za-z\s]+$/;
    const sportPattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(formData.username)) {
      setErrors(prev => ({ ...prev, submit: "First name should contain only letters and spaces." }));
      return;
    }
    if (!sportPattern.test(formData.favouriteSport)) {
      setErrors(prev => ({ ...prev, submit: "favouriteSport name should contain only letters and spaces." }));
      return;
    }

    if (!emailPattern.test(formData.email)) {
      setErrors(prev => ({ ...prev, submit: "Enter a valid Gmail address." }));
      return;
    }

    if (!phonePattern.test(formData.phone)) {
      setErrors(prev => ({ ...prev, submit: "Enter a valid phone number starting with 6-9 and 10 digits long." }));
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      setErrors(prev => ({ ...prev, submit: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and min should be 6." }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, submit: "Passwords don't match!" }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:8085/api/auth/signup", {
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        favouriteSport: formData.favouriteSport,
      });

      if (response.status === 200) {
        const loginResult = await login(formData.email, formData.password);
        if (loginResult.success) {
          alert("Registration and login successful!");
          navigate('/');
        } else {
          alert("Registered, but login failed.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors(prev => ({ ...prev, submit: error.response?.data?.message || "Registration failed." }));
    }
  };

  return (
    <div className="register-root">
      <div className="register-card">
        <div className="register-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            {/* Logo and title can be added here if needed */}
          </div>
          <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back</button>
          <div className="register-title">Create Account</div>
          <div className="register-description">Join us to start your loan journey</div>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Full Name</label>
                <div className="input-wrapper">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Full name"
                    value={formData.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    required
                  />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="favouriteSport">Favourite Sport</label>
              <div className="input-wrapper">
                <input
                  id="favouriteSport"
                  type="text"
                  placeholder="Enter your favourite sport"
                  value={formData.favouriteSport}
                  onChange={e => handleInputChange('favouriteSport', e.target.value)}
                  required
                />
              </div>
              {errors.favouriteSport && <span className="error-message">{errors.favouriteSport}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            {errors.submit && <span className="error-message">{errors.submit}</span>}
            <button type="submit" className="submit-btn">Create Account</button>
            <div className="login-link">
              Already have an account?{' '}
              <Link to="/login">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;