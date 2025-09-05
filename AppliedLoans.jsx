import React, { useEffect, useState } from "react";
import "./AppliedLoans.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppliedLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all applications from backend (no ID or params)
    axios.get("http://localhost:8085/api/loan-applications/all")
      .then(res => {
        setApplications(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch(err => {
        setError("Failed to fetch applications");
        setLoading(false);
      });
  }, []);

  return (
    <div className="applied-loans-page">
      
        <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
   
      <h2 className="applied-loans-title">Customer Applications</h2>
      
      <div className="applied-loans-list">
        {loading ? (
          <div className="applied-loans-loading">Loading...</div>
        ) : error ? (
          <div className="applied-loans-error">{error}</div>
        ) : (
          applications.length === 0 ? (
            <div className="applied-loans-empty">No applications found.</div>
          ) : (
            applications.map(app => (
              <section key={app.application_id} className="applied-loans-section">
                <div className="applied-loans-section-header">
                  <span className="applied-loans-section-title">Application #{app.application_id}</span>
                  <span className={`status-badge status-${app.approval_Status?.toLowerCase()}`}>{app.approval_Status}</span>
                </div>
                <div className="applied-loans-section-details">
                  <div><strong>Customer ID:</strong> {app.customerId}</div>
                  <div><strong>Loan Product ID:</strong> {app.loan_product_id}</div>
                  <div><strong>Amount:</strong> {app.loan_amount}</div>
                  <div><strong>Date:</strong> {app.application_date}</div>
                </div>
                {app.approval_Status === 'PENDING' && (
                  <div className="applied-loans-actions">
                    <button
                      className="applied-loans-btn approve"
                      onClick={async () => {
                        try {
                          await axios.post(`http://localhost:8085/api/loan-applications/${app.application_id}/decision`, { approved: true });
                          setApplications(applications => applications.map(a => a.application_id === app.application_id ? { ...a, approval_Status: 'APPROVED' } : a));
                        } catch (err) {
                          alert('Failed to approve application');
                        }
                      }}
                    >Approve</button>
                    <button
                      className="applied-loans-btn reject"
                      onClick={async () => {
                        try {
                          await axios.post(`http://localhost:8085/api/loan-applications/${app.application_id}/decision`, { approved: false });
                          setApplications(applications => applications.map(a => a.application_id === app.application_id ? { ...a, approval_Status: 'REJECTED' } : a));
                        } catch (err) {
                          alert('Failed to reject application');
                        }
                      }}
                    >Reject</button>
                  </div>
                )}
              </section>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AppliedLoans;
