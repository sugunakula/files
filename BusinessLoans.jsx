// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import "./BusinessLoans.css";

const BusinessLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    businessType: "",
    loanTerm: "",
    businessAge: ""
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
    <div className="business-loans-bg">
      <div className="business-loans-header">
        <div className="business-loans-container">
          <Button variant="ghost" onClick={() => navigate('/')} className="btn-back">
            <ArrowLeft className="icon-arrow" />
            Back to Home
          </Button>
          <div className="header-flex">
            <div className="header-logo" style={{ color: "white" }}>
               <FileText className="icon-building"  />
            </div>
            <div>
              <h1 className="header-title">Business Loans</h1>
              <p className="header-subtitle">Fuel your business growth</p>
            </div>
          </div>
        </div>
      </div>
      <div className="business-loans-container">
        <div className="business-loans-section">
          <div className="info-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileText className="icon-building" />
                  Loan Requirements
                </div>
              </div>
              <div className="card-content">
                <div className="requirements-grid">
                  <div>
                    <h4 className="requirement-label">CIBIL Score</h4>
                    <p className="requirement-value">700+</p>
                  </div>
                  <div>
                    <h4 className="requirement-label">Business Age</h4>
                    <p className="requirement-value">2+ years</p>
                  </div>
                  <div>
                    <h4 className="requirement-label">Annual Turnover</h4>
                    <p className="requirement-value">₹10 Lakhs+</p>
                  </div>
                  <div>
                    <h4 className="requirement-label">Max Amount</h4>
                    <p className="requirement-value">₹5 Crores</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Key Features</div>
              </div>
              <div className="card-content">
                <ul className="features-list">
                  <li><CheckCircle className="icon-feature" />Interest rates starting from 10.50% APR</li>
                  <li><CheckCircle className="icon-feature" />Loan amount up to ₹5 Crores</li>
                  <li><CheckCircle className="icon-feature" />Loan tenure up to 10 years</li>
                  <li><CheckCircle className="icon-feature" />SBA loans available</li>
                  <li><CheckCircle className="icon-feature" />Equipment financing options</li>
                  <li><CheckCircle className="icon-feature" />Working capital loans</li>
                  <li><CheckCircle className="icon-feature" />Quick approval process</li>
                  <li><CheckCircle className="icon-feature" />Minimal documentation</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Business Types</div>
              </div>
              <div className="card-content">
                <div className="business-types-grid">
                  <span className="business-type">Manufacturing</span>
                  <span className="business-type">Trading</span>
                  <span className="business-type">Services</span>
                  <span className="business-type">Retail</span>
                  <span className="business-type">Restaurant</span>
                  <span className="business-type">Healthcare</span>
                  <span className="business-type">Technology</span>
                  <span className="business-type">Agriculture</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Required Documents</div>
              </div>
              <div className="card-content">
                <ul className="documents-list">
                  <li>Business Registration Certificate</li>
                  <li>GST Registration</li>
                  <li>ITR for last 3 years</li>
                  <li>Bank Statements (12 months)</li>
                  <li>Balance Sheet & P&L</li>
                  <li>Identity & Address Proof</li>
                  <li>Business Plan (if required)</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Only show Apply Now section if not admin (localStorage check) */}
          {!localStorage.getItem('admin') && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Apply Now</div>
              </div>
              <div className="card-content">
                <p className="apply-description">Ready to grow your business? Start your loan application today.</p>
                <Button className="btn-apply" onClick={handleStartApplication}>Start Application</Button>
                {showLoanForm && (
                  <div className="application-form">
                    <LoanApplicationForm
                      loanProductId={4444}
                      loanIntrest={10.50}
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

export default BusinessLoans;