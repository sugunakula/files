import React, { useState } from "react";
import axios from "axios";
import JSHeader from "@/components/JSHeader";
import JSHeroSection from "@/components/JSHeroSection";
import JSLoanTypes from "@/components/JSLoanTypes";
import Footer from "@/components/Footer";
import "../index.css";
import { useAuth } from "../contexts/AuthContext";
import AdminBankOverview from "@/components/AdminBankOverview";

const Index = () => {
  // Pure JavaScript page initialization
  console.log("PureLoan Bank homepage loaded at:", new Date().toLocaleString());
  
  // Pure JavaScript scroll event handler
  const handleScroll = function() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };

  // Add scroll listener using pure JavaScript
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  // Admin dashboard section
  const [bankStats, setBankStats] = useState({ customers: 0, loans: 0, loanTypes: [] });
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    // if (localStorage.getItem('admin')) {
    //   // Fetch bank stats from backend
    //   axios.get('http://localhost:8080/api/admin/bank-stats')
    //     .then(res => {
    //       setBankStats(res.data);
    //     })
    //     .catch(() => {
    //       setBankStats({ customers: 0, loans: 0, loanTypes: [] });
    //     });
    // }
  }, []);

  return (
    <div className="index-root">
      <JSHeader />
      <JSHeroSection />
      <JSLoanTypes />
      {/* Admin-only section on home page (static, styled) */}
      {localStorage.getItem('admin') && isAuthenticated && (
        <AdminBankOverview />
      )}
      <Footer />
    </div>
  );
};

export default Index;