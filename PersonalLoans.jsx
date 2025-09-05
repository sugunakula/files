// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ArrowLeft, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import "./PersonalLoans.css";

const PersonalLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    purpose: "",
    loanTerm: "",
    monthlyIncome: ""
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
    <div className="personal-loans-bg">
      {/* Header */}
      <div className="personal-loans-header">
        <div className="personal-loans-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mb-4"
          >
            <ArrowLeft className="icon-arrow" />
            Back to Home
          </Button>
          <div className="header-flex">
            <div className="header-logo">
              <CreditCard className="icon-creditcard" />
            </div>
            <div>
              <h1 className="header-title">Personal Loans</h1>
              <p className="header-subtitle">Fulfill your personal aspirations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="personal-loans-container">
        <div className="personal-loans-section">
          {/* Loan Information */}
          <div className="info-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileText className="icon-filetext" />
                  Loan Requirements
                </div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div>
                    <h4 className="info-label">CIBIL Score</h4>
                    <p className="info-value">650+</p>
                  </div>
                  <div>
                    <h4 className="info-label">Age Range</h4>
                    <p className="info-value">21-58 years</p>
                  </div>
                  <div>
                    <h4 className="info-label">Min Income</h4>
                    <p className="info-value">₹15,000/month</p>
                  </div>
                  <div>
                    <h4 className="info-label">Max Amount</h4>
                    <p className="info-value">₹50 Lakhs</p>
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
                  {["Interest rates starting from 9.95% APR","Loan amount up to ₹50 Lakhs","Loan tenure up to 5 years","No collateral required","Same-day approval","Instant disbursal","Flexible repayment options","No prepayment charges"].map((feature, index) => (
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
                <div className="card-title">Loan Purposes</div>
              </div>
              <div className="card-content">
                <div className="purposes-grid">
                  {["Wedding Expenses","Medical Emergency","Home Renovation","Education","Travel & Vacation","Debt Consolidation","Business Setup","Festival Expenses"].map((purpose, index) => (
                    <div key={index} className="purpose-row">
                      <div className="purpose-dot" />
                      <span className="purpose-text">{purpose}</span>
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
                  Ready to get your personal loan? Complete your application in minutes.
                </p>
                <Button className="btn-apply" onClick={handleStartApplication}>Start Application</Button>
                {showLoanForm && (
                  <div className="application-form">
                    <LoanApplicationForm
                      loanProductId={2222}
                      loanIntrest={9.95}
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

export default PersonalLoans;