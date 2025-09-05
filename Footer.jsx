import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";
import userLogo from "../assets/user_logo.svg";


const Footer = () => {
  return (
    <footer id="contact" className="footer new-footer">
      <div className="footer-main new-footer-main">
        <div className="footer-brand">
          <img src={userLogo} alt="PureLoan Logo" className="footer-logo" />
          <div className="brand-title">PureLoan</div>
          <p className="brand-desc">Fast, secure, and flexible loans for every need. Trusted by thousands. Your financial partner for life.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4 className="footer-heading">Loans</h4>
            <ul>
              <li><a href="/home-loans">Home Loans</a></li>
              <li><a href="/vehicle-loans">Vehicle Loans</a></li>
              <li><a href="/personal-loans">Personal Loans</a></li>
              <li><a href="/business-loans">Business Loans</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Customer</h4>
            <ul>
              <li>Apply Now</li>
              <li>Login</li>
              <li>My Applications</li>
              <li>KYC Verification</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul>
    
              <li>Contact Us</li>
              <li>Email Support : admin@gmail.com</li>
              <li>Call: +91 98765 43210</li>
            </ul>
          </div>
          
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;