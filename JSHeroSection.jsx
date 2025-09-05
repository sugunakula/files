
import { useState } from "react";
import bankHero from "@/assets/bank-hero.jpg";
import "./JSHeroSection.css";

const JSHeroSection = () => {
  // Pure JavaScript state management
  // const [formData, setFormData] = useState({
  //   loanAmount: "",
  //   loanType: "",
  //   creditScore: "",
  //   annualIncome: ""
  // });

  // // Pure JavaScript calculator logic
  // const calculateMonthlyPayment = function(amount, type) {
  //   if (!amount || !type) return "---";
    
  //   const principal = parseFloat(amount);
  //   const rates = {
  //     "home": 0.0299,
  //     "auto": 0.0349,
  //     "personal": 0.0599,
  //     "business": 0.0449
  //   };
    
  //   const rate = rates[type] || 0.05;
  //   const years = type === "home" ? 30 : type === "auto" ? 5 : 3;
  //   const months = years * 12;
    
  //   const monthlyRate = rate / 12;
  //   const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
  //                         (Math.pow(1 + monthlyRate, months) - 1);
    
  //   return Math.round(monthlyPayment).toLocaleString();
  // };

  // // Pure JavaScript form handlers
  // const handleInputChange = function(field, value) {
  //   console.log(`Field ${field} changed to: ${value}`);
  //   setFormData(function(prev) {
  //     return {
  //       ...prev,
  //       [field]: value
  //     };
  //   });
  // };

  // const handleQuickQuote = function() {
  //   console.log("Quick quote calculation:", formData);
    
  //   if (!formData.loanAmount || !formData.loanType) {
  //     alert("Please fill in loan amount and type to get a quote.");
  //     return;
  //   }
    
  //   // Simulate API call with setTimeout
  //   const loadingMessage = "Calculating your personalized quote...";
  //   console.log(loadingMessage);
    
  //   setTimeout(function() {
  //     const payment = calculateMonthlyPayment(formData.loanAmount, formData.loanType);
  //     const rate = formData.loanType === "home" ? "2.99%" : 
  //                  formData.loanType === "auto" ? "3.49%" : 
  //                  formData.loanType === "personal" ? "5.99%" : "4.49%";
      
  //     alert(`Your estimated monthly payment: $${payment}\nInterest rate: ${rate} APR\n\nWould you like to proceed with a full application?`);
  //   }, 1500);
  // };

  // const handleApplyNow = function() {
  //   console.log("Apply now clicked with data:", formData);
    
  //   // Pure JavaScript form validation
  //   const requiredFields = ["loanAmount", "loanType"];
  //   const missingFields = requiredFields.filter(function(field) {
  //     return !formData[field];
  //   });
    
  //   if (missingFields.length > 0) {
  //     alert(`Please complete the following fields: ${missingFields.join(", ")}`);
  //     return;
  //   }
    
  //   // Simulate application process
  //   const steps = [
  //     "Validating information...",
  //     "Checking credit...", 
  //     "Processing application...",
  //     "Application submitted successfully!"
  //   ];
    
  //   let currentStep = 0;
  //   const interval = setInterval(function() {
  //     console.log(steps[currentStep]);
  //     if (currentStep === steps.length - 1) {
  //       clearInterval(interval);
  //       alert("Application submitted! You'll receive a response within 24 hours.");
  //     }
  //     currentStep++;
  //   }, 1000);
  // };

  return (
    <section id="about" className="hero-section">
      {/* Background Image */}
      <div 
        className="hero-bg-image"
        style={{ backgroundImage: `url(${bankHero})` }}
      />
      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay" />
      {/* Content */}
      <div className="hero-content-container">
        <div className="hero-content-center">
          <div className="hero-main-content">
            <h1 className="hero-title">
              Professional Banking Solutions
              <span className="hero-title-highlight">
                Your Trusted Financial Partner
              </span>
            </h1>
            <p className="hero-desc">
              Our Bank Loan Management System is a smart solution designed to simplify loan operations for banks
and financial institutions. It enables seamless loan application, approval, disbursement — all in one platform. Customers can easily manage their loans through an intuitive interface. The system helps reduce manual errors and speeds up decision-making for better financial outcomes
 
            </p>
            <div className="hero-features">
              <h3 className="hero-features-title">Why Choose Our Loan Banking System?</h3>
              <div className="hero-features-grid">
                <div className="hero-feature-list">
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>Lowest market rates starting from 2.99% APR</span>
                  </div>
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>Instant approval with minimal documentation</span>
                  </div>
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>No hidden fees or prepayment penalties</span>
                  </div>
                </div>
                <div className="hero-feature-list">
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>Flexible tenure options up to 30 years</span>
                  </div>
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>Digital-first process with doorstep service</span>
                  </div>
                  <div className="hero-feature-row">
                    <span className="hero-feature-dot"></span>
                    <span>FDIC insured with 99.9% uptime guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JSHeroSection;