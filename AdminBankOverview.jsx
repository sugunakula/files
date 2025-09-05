import React, { useEffect, useState } from "react";
import "./AdminBankOverview.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userLogo from "../assets/user_logo.svg";

const AdminBankOverview = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8085/api/auth/count")
      .then(res => {
        console.log("Count response:", res.data); // Debug log
        setCustomerCount(res.data.count || 0);
        setCustomers(res.data.users || []); // Use 'users' key as per backend
      })
      .catch(err => {
        console.error("Error fetching count:", err);
        setCustomerCount(0);
        setCustomers([]);
      });
    axios.get("http://localhost:8085/api/loan-applications/loanscount")
      .then(res => {
        setLoanCount(res.data || 0);
      })
      .catch(() => setLoanCount(0));
    //   console.log(res.data.count);
  }, []);

  const handleViewCustomers = () => {
    navigate('/all-customers', { state: { customers } });
  };

  return (
    <section className="dashboard-section admin-bank-section">
      <h2 className="section-title">Bank Overview</h2>
      <div className="bank-stats-grid">
        <div className="bank-stat-card">
          <div className="stat-icon"><img src="/bank-svgrepo-com.svg" alt="Bank" style={{width:32, height:32}} /></div>
          <div className="stat-title">Total Customers</div>
          <div className="stat-value">{customerCount}</div>
          <button className="stat-action-btn" onClick={handleViewCustomers}>
            View All Customers
          </button>
        </div>
        <div className="bank-stat-card">
          <div className="stat-icon"><img src={userLogo} alt="Loans" style={{width:32, height:32}} /></div>
          <div className="stat-title" >Total Loans</div>
          <div className="stat-value">{loanCount}</div>
          <button className="stat-action-btn" onClick={() => navigate('/applied-loans')}>
            View All Loans
          </button>
        </div>
        <div className="bank-stat-card">
          <div className="stat-icon"><img src="/bank-svgrepo-com.svg" alt="Bank" style={{width:32, height:32}} /></div>
          <div className="stat-title">Loan Types</div>
          <ul className="stat-list">
            <li>Home Loan</li>
            <li>Business Loan</li>
            <li>Vehicle Loan</li>
            <li>Personal Loan</li>
          </ul>
        </div>
      </div>
      <div className="bank-about">
        <h3>About PureLoan Bank</h3>
        <p>PureLoan Bank is a leading provider of financial solutions, serving over 1,200 customers with a wide range of loan products. Our mission is to empower individuals and businesses with flexible, affordable loans and world-class service.</p>
      </div>
    </section>
  );
};

export default AdminBankOverview;
