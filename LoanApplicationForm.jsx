import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./LoanApplicationForm.css";

const LoanApplicationForm = ({ onSubmit, loanProductId, loanIntrest }) => {
  // Extract customerId and customer data from localStorage before useState
  let customerId = '';
  let customerData = null;
  try {
    const customer = localStorage.getItem('customer');
    if (customer) {
      const parsed = JSON.parse(customer);
      customerId = parsed.customerId || '';
      customerData = parsed;
    }
  } catch (e) {
    customerId = '';
    customerData = null;
  }

  // Check for user and KYC status before showing form
  const userLocal = localStorage.getItem('user');
  if (!userLocal) {
    window.location.href = '/login';
    return (
      <div className="loan-form loan-form-warning">
        <div className="warning-title">Complete Profile to Start Application</div>
        <div className="warning-desc">Your customer profile is missing. Please complete your profile before applying for a loan.</div>
      </div>
    );
  }
  if (!customerId) {
    return (
      <div className="loan-form loan-form-warning">
        <div className="warning-title">Complete Profile to Start Application</div>
        <div className="warning-desc">Your customer profile is missing. Please complete your profile before applying for a loan.</div>
      </div>
    );
  }
  if (customerData && customerData.kycStatus && customerData.kycStatus.toLowerCase() !== 'verified') {
    return (
      <div className="loan-form loan-form-error">
        <div className="error-title">Complete KYC to Start Application</div>
        <div className="error-desc">Your KYC is not verified. Please complete your KYC process to apply for a loan.</div>
      </div>
    );
  }

  const initialLoanIntrest = typeof loanIntrest === "number" ? loanIntrest.toString() : (loanIntrest || "8.5");
  const [form, setForm] = useState({
    application_date: new Date().toISOString().slice(0, 10),
    approval_Status: "PENDING",
    loan_amount: "",
    loanIntrest: initialLoanIntrest,
    tenure: "",
    monthlyEmi: "",
    customerId: customerId,
    loan_product_id: loanProductId || "",
  });

  // Update loanIntrest in form state if prop changes
  useEffect(() => {
    if (typeof loanIntrest !== "undefined") {
      setForm((prev) => ({ ...prev, loanIntrest: loanIntrest.toString() }));
    }
  }, [loanIntrest]);

  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate EMI whenever loan_amount, tenure, or loanIntrest changes
  useEffect(() => {
    const P = parseFloat(form.loan_amount);
    const years = parseFloat(form.tenure);
    const N = years > 0 ? years * 12 : 0; // Convert years to months
    const R = parseFloat(form.loanIntrest) / 12 / 100;
    if (P > 0 && N > 0 && R > 0) {
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setForm((prev) => ({ ...prev, monthlyEmi: emi ? emi.toFixed(2) : "" }));
    } else {
      setForm((prev) => ({ ...prev, monthlyEmi: "" }));
    }
  }, [form.loan_amount, form.tenure, form.loanIntrest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(form.loan_amount);
    if (loanAmount < 10000 || loanAmount > 100000000 || isNaN(loanAmount)) {
      alert("Enter a valid loan amount between 10,000 and 100,000,000");
      return;
    }
    if (parseFloat(form.tenure) <= 0 || isNaN(parseFloat(form.tenure))) {
      alert("Enter valid tenure in years");
      return;
    }

    const payload = {
      ...form,
      loan_amount: parseFloat(form.loan_amount),
      loanIntrest: parseFloat(form.loanIntrest),
      tenure: parseFloat(form.tenure), // tenure in years
      monthlyEmi: parseFloat(form.monthlyEmi),
    };

    try {
      console.log("Sending data:", payload);
      const response = await axios.post("http://localhost:8085/api/loan-applications/apply", payload);
      console.log("Loan application submitted:", response.data);
      if (onSubmit) onSubmit(form); // Call parent to close form immediately
      setShowSuccess(true); // Show success popup
      // Optionally, you can reset the form here if needed
    } catch (error) {
      console.error("Error submitting loan application:", error.response?.data || error.message);
    }
  };

  if (showSuccess) {
    return (
      <div className="loan-form loan-form-success">
        <div className="success-title">Application Submitted Successfully!</div>
        <div className="success-desc">Thank you for applying. We will contact you soon.</div>
      </div>
    );
  }

  return (
    <form className="loan-form" onSubmit={handleSubmit}>
      <div>
        <label>Application Date</label>
        <input
          type="date"
          name="application_date"
          value={form.application_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Approval Status</label>
        <input
          type="text"
          name="approval_Status"
          value={form.approval_Status}
          readOnly
        />
      </div>
      <div>
        <label>Loan Amount</label>
        <input
          type="number"
          name="loan_amount"
          value={form.loan_amount}
          onChange={handleChange}
          required
          min={10000}
          max={100000000}
        />
      </div>
      <div>
        <label>Loan Interest (%)</label>
        <input
          type="number"
          name="loanIntrest"
          value={form.loanIntrest}
          readOnly
          required
        />
      </div>
      <div>
        <label>Tenure (years)</label>
        <input
          type="number"
          name="tenure"
          value={form.tenure}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Monthly EMI</label>
        <input
          type="number"
          name="monthlyEmi"
          value={form.monthlyEmi}
          readOnly
          required
        />
      </div>
      <div>
        <label>Customer ID</label>
        <input
          type="text"
          name="customer_id"
          value={form.customerId}
          onChange={handleChange}
          readOnly
          required
        />
      </div>
      <div>
        <label>Loan Product ID</label>
        <input
          type="text"
          name="loan_product_id"
          value={form.loan_product_id}
          readOnly // 👈 Make this field read-only
          required
        />
      </div>
      <Button type="submit" className="mt-2 w-full">Submit Application</Button>
    </form>
  );
};

export default LoanApplicationForm;
