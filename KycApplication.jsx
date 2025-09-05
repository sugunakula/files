// import React, { useEffect, useState } from "react";
// // import "./KycApplication.css";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const KycApplication = () => {
//   const location = useLocation();
//   const [kycApplications, setKycApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (location.state && location.state.customers) {
//       setKycApplications(location.state.customers);
//       setLoading(false);
//     } else {
//       // Fetch all customers from backend
//       axios.get("http://localhost:8080/api/customers/pending-kyc")
//         .then(res => {
//           setKycApplications(res.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           setError("Failed to fetch customers");
//           setLoading(false);
//         });
//     }
//   }, [location.state]);

//   return (
//     <div className="kyc-app-page">
      
//         <button className="kyc-button back-home" type="button" onClick={() => window.location.href = "/"}>Back to Home</button>
    
//       <h2 className="kyc-app-title">Customer List</h2>
//       <div className="kyc-app-list">
//         {loading ? (
//           <div className="kyc-app-loading">Loading...</div>
//         ) : error ? (
//           <div className="kyc-app-error">{error}</div>
//         ) : (
//           kycApplications.length === 0 ? (
//             <div className="kyc-app-empty">No customers found.</div>
//           ) : (
//             kycApplications.map(app => (
//               <section key={app.customerId || app.id} className="kyc-app-section">
//                 <div className="kyc-app-section-header">
//                   <span className="kyc-app-section-title">Customer #{app.customerId || app.id}</span>
//                   <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status || 'ACTIVE'}</span>
//                 </div>
//                 <div className="kyc-app-section-details impressive-details">
//                   <h1>Customer Details</h1>
//                   <div className="kyc-app-detail-row">
//                     <h2>Name</h2>
//                     <p>{app.username}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>Email</h2>
//                     <p>{app.email}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>Phone</h2>
//                     <p>{app.phone}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>Aadhaar</h2>
//                     <p>{app.adhar_number}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>PAN</h2>
//                     <p>{app.pan_number}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>KYC Status</h2>
//                     <p>{app.kyc_status}</p>
//                   </div>
//                   <div className="kyc-app-detail-row">
//                     <h2>Address</h2>
//                     <p>{app.address}</p>
//                   </div>
//                   {/* Add more fields explicitly as needed, e.g. favourite sport, dob, etc. */}
//                 </div>
//                 <div className="kyc-app-actions">
//                   <button className="kyc-app-btn approve"
//                     onClick={async () => {
//                       try {
//                         await axios.post(`http://localhost:8080/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'VERIFIED' });
//                         setKycApplications(apps => apps.filter(a => (a.customerId || a.id) !== (app.customerId || app.id)));
//                         // Show toast notification for success
//                         if (window.toast) window.toast.success('Customer KYC approved!');
//                       } catch (err) {
//                         if (window.toast) window.toast.error('Failed to approve customer KYC');
//                       }
//                     }}
//                   >Approve</button>
//                   <button className="kyc-app-btn reject"
//                     onClick={async () => {
//                       try {
//                         await axios.post(`http://localhost:8080/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'REJECTED' });
//                         setKycApplications(apps => apps.filter(a => (a.customerId || a.id) !== (app.customerId || app.id)));
//                         // Show toast notification for rejection
//                         if (window.toast) window.toast.success('Customer KYC rejected!');
//                       } catch (err) {
//                         if (window.toast) window.toast.error('Failed to reject customer KYC');
//                       }
//                     }}
//                   >Reject</button>
//                 </div>
//               </section>
//             ))
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default KycApplication;

import React, { useEffect, useState } from "react";
import "./KycApplication.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const KycApplication = () => {
  const location = useLocation();
  const [kycApplications, setKycApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.customers) {
      setKycApplications(location.state.customers);
      setLoading(false);
    } else {
      axios.get("http://localhost:8085/api/customers/pending-kyc")
        .then(res => {
          setKycApplications(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError("Failed to fetch customers");
          setLoading(false);
        });
    }
  }, [location.state]);

  return (
    <div className="kyc-app-page">
      
        <button className="kyc-button back-home" type="button" onClick={() => window.location.href = "/"}>Back to Home</button>
    
      <h2 className="kyc-app-title">Customer List</h2>
      <div className="kyc-app-list">
        {loading ? (
          <div className="kyc-app-loading">Loading...</div>
        ) : error ? (
          <div className="kyc-app-error">{error}</div>
        ) : (
          kycApplications.length === 0 ? (
            <div className="kyc-app-empty">No customers found.</div>
          ) : (
            kycApplications.map(app => (
              <section key={app.customerId || app.id} className="kyc-app-section">
                <div className="kyc-app-section-header">
                  <span className="kyc-app-section-title">Customer #{app.customerId || app.id}</span>
                  <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status || 'ACTIVE'}</span>
                </div>
                <div className="kyc-app-section-details impressive-details">
                  {Object.entries(app).map(([key, value]) => (
                    <div key={key} className="kyc-app-detail-row">
                      <span className="kyc-app-detail-key">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                      <span className="kyc-app-detail-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
                <div className="kyc-app-actions">
                  <button className="kyc-app-btn approve"
                    onClick={async () => {
                      try {
                        await axios.post(`http://localhost:8085/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'VERIFIED' });
                        setKycApplications(apps => apps.filter(a => a.customerId !== app.customerId));
                      } catch (err) {
                        alert('Failed to approve customer KYC');
                      }
                    }}
                  >Approve</button>
                  <button className="kyc-app-btn reject"
                    onClick={async () => {
                      try {
                        await axios.post(`http://localhost:8085/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'REJECTED' });
                        setKycApplications(apps => apps.filter(a => a.customerId !== app.customerId));
                      } catch (err) {
                        alert('Failed to reject customer KYC');
                      }
                    }}
                  >Reject</button>
                </div>
              </section>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default KycApplication;