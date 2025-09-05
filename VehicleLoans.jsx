// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, ArrowLeft, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import "./VehicleLoans.css";

const VehicleLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    vehicleType: "",
    loanTerm: "",
    downPayment: ""
  });

  // Determine role from localStorage
  const isAdmin = Boolean(localStorage.getItem('admin'));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowLoanForm(true);
    }
  };

  const handleLoanApplicationSubmit = (formData) => {
    alert("Loan application submitted!\n" + JSON.stringify(formData, null, 2));
    setShowLoanForm(false);
  };

  return (
    <div className="vehicle-loans-bg">
      <div className="vehicle-loans-header">
        <div className="vehicle-loans-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="btn-back"
          >
            <ArrowLeft className="icon-arrow" />
            Back to Home
          </Button>
          <div className="header-flex">
            <div className="header-logo">
              <Car className="icon-car" />
            </div>
            <div>
              <h1 className="header-title">Vehicle Loans</h1>
              <p className="header-subtitle">Finance your next vehicle with ease</p>
            </div>
          </div>
        </div>
      </div>

      <div className="vehicle-loans-container">
        <div className="vehicle-loans-section">
          <div className="info-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileText className="icon-car" />
                  Loan Requirements
                </div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div>
                    <h4 className="info-label">CIBIL Score</h4>
                    <p className="info-value">700+</p>
                  </div>
                  <div>
                    <h4 className="info-label">Age Range</h4>
                    <p className="info-value">21-60 years</p>
                  </div>
                  <div>
                    <h4 className="info-label">Min Income</h4>
                    <p className="info-value">₹20,000/month</p>
                  </div>
                  <div>
                    <h4 className="info-label">Max Funding</h4>
                    <p className="info-value">95%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Key Features</div>
              </div>
              <div className="card-content">
                <div className="features-list">
                  {[
                    "Interest rates starting from 8.70% APR",
                    "Loan amount up to ₹1 Crore",
                    "Loan tenure up to 7 years",
                    "Up to 95% vehicle funding",
                    "Quick approval in 24 hours",
                    "No hidden charges",
                    "Flexible repayment options",
                    "Insurance and extended warranty available"
                  ].map((feature, index) => (
                    <div key={index} className="feature-row">
                      <CheckCircle className="icon-check" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Vehicle Types Covered</div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  {[
                    "New Cars",
                    "Used Cars",
                    "Two Wheelers",
                    "Commercial Vehicles",
                    "Luxury Cars",
                    "Electric Vehicles"
                  ].map((type, index) => (
                    <div key={index} className="feature-row">
                      <div className="icon-dot" />
                      <span className="feature-text">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Required Documents</div>
              </div>
              <div className="card-content">
                <div className="features-list">
                  {[
                    "Identity Proof (Aadhar/PAN/Passport)",
                    "Address Proof (Utility Bills)",
                    "Income Proof (Salary Slips/ITR)",
                    "Bank Statements (3 months)",
                    "Vehicle Quotation/Invoice",
                    "Passport Size Photographs"
                  ].map((doc, index) => (
                    <div key={index} className="feature-row">
                      <div className="icon-dot" />
                      <span className="feature-text">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {!isAdmin && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Apply Now</div>
              </div>
              <div className="card-content">
                <p className="apply-description">
                  Ready to finance your vehicle? Start your application process today.
                </p>
                <Button className="btn-apply" onClick={handleStartApplication}>Start Application</Button>
                {showLoanForm && (
                  <div className="application-form">
                    <LoanApplicationForm
                      loanProductId={3333}
                      loanIntrest={8.70}
                      onSubmit={handleLoanApplicationSubmit}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleLoans;