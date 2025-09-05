// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, Building } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import "./HomeLoans.css";

const HomeLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    loanAmount: "",
    homeValue: "",
    loanTerm: "",
    downPayment: ""
  });
  const [calculationResult, setCalculationResult] = useState(null);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [customerId] = useState("CUS123456"); // Replace with actual customer id logic

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setCalculationResult(null);
  };

  const handleLoanApplicationSubmit = (formData) => {
    // TODO: Integrate backend API call for loan application
    alert("Loan application submitted!\n" + JSON.stringify(formData, null, 2));
    setShowLoanForm(false);
  };

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowLoanForm(true);
    }
  };

  // Determine role from localStorage
  const isAdmin = Boolean(localStorage.getItem('admin'));

  return (
    <div className="home-loans-bg">
      <div className="home-loans-header">
        <div className="home-loans-container">
          <Button variant="ghost" onClick={() => navigate('/')} className="btn-back">
            <ArrowLeft className="icon-arrow" />
            Back to Home
          </Button>
          <div className="header-flex">
            <div className="header-logo">
              <Home className="icon-home" />
            </div>
            <div>
              <h1 className="header-title">Home Loans</h1>
              <p className="header-subtitle">Make your dream home a reality</p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-loans-container">
        <div className="home-loans-section">
          <div className="info-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Building className="icon-building" />
                  Loan Requirements
                </div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div>
                    <h4 className="info-label">CIBIL Score</h4>
                    <p className="info-value">750+</p>
                  </div>
                  <div>
                    <h4 className="info-label">Age Range</h4>
                    <p className="info-value">21-65 years</p>
                  </div>
                  <div>
                    <h4 className="info-label">Min Income</h4>
                    <p className="info-value">₹25,000/month</p>
                  </div>
                  <div>
                    <h4 className="info-label">Max LTV</h4>
                    <p className="info-value">90%</p>
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
                    "Interest rates starting from 7.99% APR",
                    "Loan amount up to ₹5 Crores",
                    "Loan tenure up to 30 years",
                    "No prepayment charges after 1 year",
                    "Quick approval in 48 hours",
                    "Doorstep documentation",
                    "Tax benefits under Section 80C & 24B"
                  ].map((feature, index) => (
                    <div key={index} className="feature-row">
                      <CheckCircle className="icon-check" />
                      <span className="feature-text">{feature}</span>
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
                  Ready to get your home loan? Start your application process today.
                </p>
                <Button className="btn-apply" onClick={handleStartApplication}>Start Application</Button>
                {showLoanForm && (
                  <div className="application-form">
                    <LoanApplicationForm
                      loanProductId={1111}
                      loanIntrest={7.99}
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

export default HomeLoans;