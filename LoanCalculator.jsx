import React, { useState, useEffect } from "react";
import "./LoanCalculator.css";

const loanOptions = [
  { label: "Home Loan", value: "home", defaultRate: 8.5, defaultTerm: 20 },
  { label: "Vehicle Loan", value: "vehicle", defaultRate: 9.5, defaultTerm: 5 },
  { label: "Personal Loan", value: "personal", defaultRate: 12.5, defaultTerm: 3 },
  { label: "Business Loan", value: "business", defaultRate: 11.0, defaultTerm: 7 },
];

function calculateEMI(P, r, n) {
  r = r / 12 / 100;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const LoanCalculator = ({ loanType }) => {
  const [selectedType, setSelectedType] = useState(loanType || loanOptions[0].label);
  const selected = loanOptions.find(opt => opt.label === selectedType) || loanOptions[0];
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(selected.defaultRate);
  const [term, setTerm] = useState(selected.defaultTerm);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setRate(selected.defaultRate);
    setTerm(selected.defaultTerm);
    setAmount("");
    setResult(null);
  }, [selectedType]);

  const handleClear = () => {
    setAmount("");
    setRate(selected.defaultRate);
    setTerm(selected.defaultTerm);
    setResult(null);
  };

  const handleCalculate = () => {
    const P = parseFloat(amount);
    const r = parseFloat(rate);
    const n = parseInt(term) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setResult({ error: "Please enter valid values." });
      return;
    }
    const monthlyPayment = calculateEMI(P, r, n);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  return (
    <div className="loan-calculator">
      <h2>{selected.label} Calculator</h2>
      <div>
        <label>Loan Type</label>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          {loanOptions.map(opt => (
            <option key={opt.value} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Loan Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div>
        <label>Interest Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={e => setRate(e.target.value)}
          placeholder="Interest rate"
        />
      </div>
      <div>
        <label>Loan Term (years)</label>
        <input
          type="number"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Loan term in years"
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          type="button"
          className="loan-calculator-btn"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        <button
          type="button"
          className="loan-calculator-clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {result && (
        <div className="loan-calculator-result">
          {result.error ? (
            <span className="loan-calculator-error">{result.error}</span>
          ) : (
            <>
              <div style={{ marginBottom: '0.5rem' }}>
                <span className="loan-calculator-label">Monthly Payment:</span> ₹{result.monthlyPayment}
              </div>
              <div>
                <span className="loan-calculator-label">Total Interest Paid:</span> ₹{result.totalInterest}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;