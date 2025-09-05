import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Repayment.css";

const Repayment = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const checkLoan = async () => {
      try {
        const storedCustomer = JSON.parse(localStorage.getItem('customer'));
        if (storedCustomer) {
          const response = await axios.get(`http://localhost:8085/api/loan-applications/checkloans?customer_id=${storedCustomer.customerId}`);
          setLoans(response.data || []);
        }
      } catch (error) {
        setLoans([]);
        console.error("Error fetching loans:", error);
      }
    };
    checkLoan();
  }, []);

  return (
    <div className="repayment-root">
      <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
      <h2 className="repayment-title">Repayment for Your Loans</h2>
      <div className="repayment-list">
        {loans.length > 0 ? (
          loans.map((repay, idx) => {
            // Calculate next installment date: current date + 30 days
            const currentDate = new Date();
            const nextInstallmentDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            const formattedNextInstallment = nextInstallmentDate.toISOString().slice(0, 10);
            return (
              <div key={repay.loanId || idx} className="repayment-card">
                <div className="repayment-header">
                  <span className={`repayment-status ${repay.status?.toLowerCase() || repay.approval_Status?.toLowerCase()}`}>{repay.status || repay.approval_Status}</span>
                </div>
                <div className="repayment-details">
                  <div><strong>Loan ID:</strong> {repay.loanType || repay.loan_product_id || '-'}</div>
                  <div><strong>Amount:</strong> ₹{repay.loan_amount || repay.amount || '-'}</div>
                  <div><strong>Next Installment:</strong> {formattedNextInstallment}</div>
                  <div><strong>Installment Amount:</strong> ₹{repay.monthlyEmi || repay.installmentAmount || '-'}</div>
                  <div><strong>Due Date:</strong> {repay.dueDate || repay.application_date || '-'}</div>
                </div>
                <button className="repay-btn" disabled={repay.status === "Paid" || repay.approval_Status === "Paid"}>
                  {(repay.status === "Paid" || repay.approval_Status === "Paid") ? "Paid" : "Pay Now"}
                </button>
              </div>
            );
          })
        ) : (
          <div className="no-active-loans">No active loans</div>
        )}
      </div>
    </div>
  );
};

export default Repayment;