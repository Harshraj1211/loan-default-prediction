import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If someone navigates here directly without data, redirect
  useEffect(() => {
    if (!state?.result) navigate("/predict");
  }, [state, navigate]);

  if (!state?.result) return null;

  const { result, inputs } = state;
  const isRisk = result.prediction === 1;

  // Derive risk indicators
  const monthlyLoan = (Number(inputs.LoanAmount) / Number(inputs.LoanTerm));
  const monthlyIncome = (Number(inputs.Income) / 12);
  const dti = ((monthlyLoan / monthlyIncome) * 100).toFixed(1);

  return (
    <div className="result-page">
      <div className="bg-glow orb-1" />
      <div className={`result-card ${isRisk ? "risk" : "safe"}`}>
        <div className="result-hero">
          <div className="verdict-badge">
            <span className="pulse-dot"></span> Classification Complete
          </div>
          <div className="result-emoji-ring">
            <span className="result-emoji">{isRisk ? "🚨" : "🛡️"}</span>
          </div>
          <h2 className="result-verdict">
            {isRisk ? "Elevated Default Risk" : "Low Risk Profile"}
          </h2>
          <p className="result-sub">
            {isRisk
              ? "The machine learning classifier flagged potential risk based on historical repayment profiles."
              : "The applicant meets key financial stability metrics with a strong repayment probability."}
          </p>
        </div>

        <div className="result-body">
          {/* Probability Gauge Box */}
          <div className="gauge-container">
            <div className="prob-row">
              <span className="prob-label">Estimated Default Probability</span>
              <span className="prob-val">{result.probability}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${result.probability}%` }} />
            </div>
            <div className="threshold-note">
              <span>0% Low Risk</span>
              <span className="threshold-marker">30% Decision Threshold</span>
              <span>100% High Risk</span>
            </div>
          </div>

          {/* Key Risk Drivers */}
          <div className="drivers-box">
            <h4>📊 Profile Risk Signals</h4>
            <div className="chips-grid">
              <span className={`risk-chip ${Number(inputs.CreditScore) < 650 ? "chip-warn" : "chip-ok"}`}>
                Credit Score: {inputs.CreditScore}
              </span>
              <span className={`risk-chip ${Number(dti) > 35 ? "chip-warn" : "chip-ok"}`}>
                DTI Ratio: {dti}%
              </span>
              <span className={`risk-chip ${inputs.EmploymentType === "Unemployed" ? "chip-warn" : "chip-ok"}`}>
                Employment: {inputs.EmploymentType}
              </span>
              <span className="risk-chip chip-ok">
                Purpose: {inputs.LoanPurpose}
              </span>
            </div>
          </div>

          {/* Applicant Financial Summary Grid */}
          <div className="result-details">
            <div className="detail-item">
              <div className="d-label">Annual Income</div>
              <div className="d-val">${Number(inputs.Income).toLocaleString()}</div>
            </div>
            <div className="detail-item">
              <div className="d-label">Loan Amount</div>
              <div className="d-val">${Number(inputs.LoanAmount).toLocaleString()}</div>
            </div>
            <div className="detail-item">
              <div className="d-label">Interest Rate</div>
              <div className="d-val">{inputs.InterestRate}%</div>
            </div>
            <div className="detail-item">
              <div className="d-label">Loan Term</div>
              <div className="d-val">{inputs.LoanTerm} Months</div>
            </div>
          </div>

          <div className="result-actions">
            <button className="btn-back" onClick={() => navigate("/predict")}>
              ← Modify Parameters
            </button>
            <button className="btn-new" onClick={() => navigate("/predict")}>
              ⚡ Run New Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

