import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./KycApplication.css";

const AllCustomers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customers = location.state?.customers || [];

  return (
    <div className="kyc-app-page">
      <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
      <h2 className="kyc-app-title">All Customers</h2>
      <div className="kyc-app-list">
        {customers.length === 0 ? (
          <div className="kyc-app-empty">No customers found.</div>
        ) : (
          customers.map((user, idx) => (
            <section key={user.id || user.customerId || idx} className="kyc-app-section">
              <div className="kyc-app-section-header">
                <span className="kyc-app-section-title">Customer #{user.id || user.customerId || idx+1}</span>
                <span className={`status-badge status-${user.status?.toLowerCase?.() || 'active'}`}>{user.status || 'ACTIVE'}</span>
              </div>
              <div className="kyc-app-section-details impressive-details">
                <div className="kyc-app-detail-row">
                  <span className="kyc-app-detail-key">Username:</span>
                  <span className="kyc-app-detail-value">{user.username}</span>
                </div>
                <div className="kyc-app-detail-row">
                  <span className="kyc-app-detail-key">Email:</span>
                  <span className="kyc-app-detail-value">{user.email}</span>
                </div>
                <div className="kyc-app-detail-row">
                  <span className="kyc-app-detail-key">Phone:</span>
                  <span className="kyc-app-detail-value">{user.phone}</span>
                </div>
                <div className="kyc-app-detail-row">
                  <span className="kyc-app-detail-key">Status:</span>
                  <span className="kyc-app-detail-value">{user.status || 'ACTIVE'}</span>
                </div>
                {/* Add more fields as needed, e.g. address, kycStatus, etc. */}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCustomers;
