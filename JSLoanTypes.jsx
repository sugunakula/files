import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button";
import { Home, Car, CreditCard, Building, Percent, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./JSLoanTypes.css";

const JSLoanTypes = () => {
  const navigate = useNavigate();
  
  // Pure JavaScript data structure
  const loanTypesData = [
    {
      icon: Home,
      title: "Home Loans",
      description: "Competitive rates for your dream home",
      rate: "7.99%",
      features: ["No down payment options", "First-time buyer programs", "Refinancing available"],
      buttonText: "Home Loan",
      id: "home",
      route: "/home-loans"
    },
    {
      icon: Car,
      title: "Vehicle Loans", 
      description: "Finance your next vehicle with ease",
      rate: "8.70%",
      features: ["New & used cars", "Quick approval", "Flexible terms"],
      buttonText: "Vehicle Loan",
      id: "vehicle",
      route: "/vehicle-loans"
    },
    {
      icon: CreditCard,
      title: "Personal Loans",
      description: "Unsecured loans loans for any purpose", 
      rate: "9.95%",
      features: ["No collateral required", "Same-day funding", "Fixed monthly payments"],
      buttonText: "Personal Loan",
      id: "personal",
      route: "/personal-loans"
    },
    {
      icon: Building,
      title: "Business Loans",
      description: "Grow your business with our capital",
      rate: "10.50%", 
      features: ["SBA loans available", "Equipment financing", "Working capital"],
      buttonText: "Business Loan",
      id: "business",
      route: "/business-loans"
    }
  ];

  // Navigation handler for loan pages
  const handleApplyLoan = function(loan) {
    navigate(loan.route);
  };

  return (
    <section className="loan-types-section" id="loans">
      <div className="loan-types-container">
        <div className="loan-types-title">Loan Solutions for Every Need</div>
        <p className="loan-types-desc">
          Choose from our comprehensive range of loan products designed to fit your financial goals
        </p>
        <div className="loan-types-grid">
          {loanTypesData.map(function(loan, index) {
            return (
              <Card key={index} className="loan-card">
                <CardHeader className="loan-card-header">
                  <div className="loan-card-icon">
                    <loan.icon className="loan-card-icon-svg" />
                  </div>
                  <CardTitle className="loan-card-title">{loan.title}</CardTitle>
                  <p className="loan-card-desc">{loan.description}</p>
                </CardHeader>
                <CardContent className="loan-card-content">
                  <div className="loan-rate-row">
                    <div className="loan-rate">
                      <Percent className="loan-rate-icon" />
                      <span>{loan.rate}</span>
                      <span className="loan-rate-apr">APR*</span>
                    </div>
                    <div className="loan-rate-label">
                      <Clock className="loan-rate-label-icon" />
                      <span>Starting rate</span>
                    </div>
                  </div>
                  <div className="loan-features-list">
                    {loan.features.map(function(feature, featureIndex) {
                      return (
                        <div key={featureIndex} className="loan-feature-row">
                          <CheckCircle className="loan-feature-icon" />
                          <span>{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Button 
                    onClick={() => handleApplyLoan(loan)}
                    className="loan-apply-btn"
                  >
                    {loan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="loan-types-footer">
          *Annual Percentage Rate (APR). Rates shown are starting rates and may vary based on creditworthiness, 
          loan amount, and other factors. All loans subject to credit approval.
        </div>
      </div>
    </section>
  );
};

export default JSLoanTypes;