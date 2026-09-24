import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Predict() {
  const [form, setForm] = useState({
    Age: 35,
    Income: 65000,
    LoanAmount: 45000,
    CreditScore: 720,
    MonthsEmployed: 36,
    NumCreditLines: 3,
    InterestRate: 6.5,
    LoanTerm: 36,
    Education: "Bachelor's",
    EmploymentType: "Full-time",
    MaritalStatus: "Single",
    HasMortgage: "No",
    HasDependents: "No",
    LoanPurpose: "Business",
    HasCoSigner: "No"
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Auto-calculate DTI Ratio
  const monthlyLoanPayment = ((parseFloat(form.LoanAmount) || 0) / (parseFloat(form.LoanTerm) || 36));
  const monthlyIncome = ((parseFloat(form.Income) || 1) / 12);
  const dtiRatio = monthlyLoanPayment / monthlyIncome;

  // Credit rating label calculation
  const getCreditTier = (score) => {
    const cs = parseInt(score) || 0;
    if (cs >= 750) return { label: "Excellent 🌟", color: "#3fb950" };
    if (cs >= 700) return { label: "Good 👍", color: "#4f8ef7" };
    if (cs >= 640) return { label: "Fair ⚠️", color: "#e3b341" };
    return { label: "Poor 🚨", color: "#f85149" };
  };

  const creditTier = getCreditTier(form.CreditScore);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        Age: parseInt(form.Age),
        Income: parseFloat(form.Income),
        LoanAmount: parseFloat(form.LoanAmount),
        CreditScore: parseInt(form.CreditScore),
        MonthsEmployed: parseInt(form.MonthsEmployed),
        NumCreditLines: parseInt(form.NumCreditLines),
        InterestRate: parseFloat(form.InterestRate),
        LoanTerm: parseInt(form.LoanTerm),
        DebtToIncomeRatio: parseFloat(dtiRatio.toFixed(4)),
        Education: form.Education,
        EmploymentType: form.EmploymentType,
        MaritalStatus: form.MaritalStatus,
        HasMortgage: form.HasMortgage,
        HasDependents: form.HasDependents,
        LoanPurpose: form.LoanPurpose,
        HasCoSigner: form.HasCoSigner
      };

      const res = await fetch("/api/predict", {        
	method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      navigate("/result", { state: { result: data, inputs: form } });
    } catch (err) {
      setError("Backend connection issue. Verify FastAPI is running at http://localhost:8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-page">
      <div className="bg-glow orb-1" />
      <div className="predict-container">
        <div className="predict-card">
          <div className="card-header">
            <div className="header-badge">✦ Interactive Assessment</div>
            <h2>🎯 Credit Default Risk Assessment</h2>
            <p>Input financial metrics to run full-spectrum ML classification</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Info Section */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="section-icon">👤</span>
                <div>
                  <h3>Personal Profile</h3>
                  <span className="section-subtitle">Demographics & background metrics</span>
                </div>
              </div>
              
              <div className="field-grid">
                <div className="form-group">
                  <label>Age (Years)</label>
                  <input name="Age" type="number" min="18" max="100" value={form.Age} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Education Level</label>
                  <select name="Education" value={form.Education} onChange={handleChange}>
                    <option>High School</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Marital Status</label>
                  <select name="MaritalStatus" value={form.MaritalStatus} onChange={handleChange}>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Has Dependents</label>
                  <select name="HasDependents" value={form.HasDependents} onChange={handleChange}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Employment & Income */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="section-icon">💼</span>
                <div>
                  <h3>Employment & Financial Capability</h3>
                  <span className="section-subtitle">Income & job stability</span>
                </div>
              </div>

              <div className="field-grid">
                <div className="form-group">
                  <label>Annual Income ($)</label>
                  <input name="Income" type="number" step="1000" min="0" value={form.Income} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Employment Type</label>
                  <select name="EmploymentType" value={form.EmploymentType} onChange={handleChange}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Self-employed</option>
                    <option>Unemployed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Months Employed</label>
                  <input name="MonthsEmployed" type="number" min="0" value={form.MonthsEmployed} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Credit Profile */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="section-icon">💳</span>
                <div>
                  <h3>Credit & Liability Profile</h3>
                  <span className="section-subtitle">Creditworthiness metrics</span>
                </div>
              </div>

              <div className="field-grid">
                <div className="form-group">
                  <div className="label-row">
                    <label>Credit Score (300 - 850)</label>
                    <span className="tier-pill" style={{ color: creditTier.color, borderColor: creditTier.color }}>
                      {creditTier.label}
                    </span>
                  </div>
                  <input name="CreditScore" type="number" min="300" max="850" value={form.CreditScore} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Active Credit Lines</label>
                  <input name="NumCreditLines" type="number" min="0" value={form.NumCreditLines} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Has Existing Mortgage</label>
                  <select name="HasMortgage" value={form.HasMortgage} onChange={handleChange}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Has Co-Signer</label>
                  <select name="HasCoSigner" value={form.HasCoSigner} onChange={handleChange}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="section-icon">💰</span>
                <div>
                  <h3>Loan Parameters</h3>
                  <span className="section-subtitle">Requested terms & purpose</span>
                </div>
              </div>

              <div className="field-grid">
                <div className="form-group">
                  <label>Loan Amount ($)</label>
                  <input name="LoanAmount" type="number" step="1000" min="0" value={form.LoanAmount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Interest Rate (%)</label>
                  <input name="InterestRate" type="number" step="0.1" min="0" value={form.InterestRate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Loan Term (Months)</label>
                  <input name="LoanTerm" type="number" min="6" max="360" value={form.LoanTerm} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Loan Purpose</label>
                  <select name="LoanPurpose" value={form.LoanPurpose} onChange={handleChange}>
                    <option>Business</option>
                    <option>Home</option>
                    <option>Education</option>
                    <option>Auto</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Dynamic DTI Gauge Display */}
              <div className="dti-gauge-card">
                <div className="dti-info">
                  <span className="dti-label">Calculated Debt-to-Income (DTI) Ratio</span>
                  <span className="dti-hint">Monthly Loan Installment vs. Monthly Gross Income</span>
                </div>
                <div className="dti-value-box">
                  <strong>{(dtiRatio * 100).toFixed(2)}%</strong>
                  <span className={`dti-tag ${dtiRatio > 0.4 ? "high" : dtiRatio > 0.25 ? "med" : "low"}`}>
                    {dtiRatio > 0.4 ? "High Risk DTI" : dtiRatio > 0.25 ? "Moderate DTI" : "Optimal DTI"}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="model-badge">
                <span className="badge-icon">🌲</span> Random Forest Ensemble (84.3% Accuracy • 100 Estimators)
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Analyzing Credit Model...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Evaluate Default Risk</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && <div className="error-msg">⚠ {error}</div>}
        </div>
      </div>
    </div>
  );
}

