export default function About() {
  return (
    <div className="about-page">
      <div className="bg-glow orb-1" />
      
      <div className="about-header">
        <div className="header-badge">✦ Architecture Overview</div>
        <h1>System Architecture & Machine Learning Pipeline</h1>
        <p className="lead">
          LoanGuard AI is an end-to-end Machine Learning web platform designed for rapid credit default risk classification utilizing Random Forest Ensemble methods.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="card-icon">🧠</div>
          <h2>Random Forest Classifier</h2>
          <p>
            Tuned ensemble model featuring 100 decision trees trained on 255,000 historical borrower records. Optimizes Gini impurity across financial ratios, employment records, and credit metrics.
          </p>
          <div className="metrics-pill-row">
            <span className="metric-tag">Accuracy: 84.3%</span>
            <span className="metric-tag">Threshold: 30.0%</span>
            <span className="metric-tag">Trees: 100</span>
          </div>
        </div>

        <div className="about-card">
          <div className="card-icon">⚡</div>
          <h2>FastAPI Microservice Engine</h2>
          <p>
            High-performance Python backend server using ASGI event loops for asynchronous request processing. Handles one-hot encoding normalization and StandardScaler transforms in real time.
          </p>
          <div className="metrics-pill-row">
            <span className="metric-tag">Latency: &lt; 50ms</span>
            <span className="metric-tag">CORS Enabled</span>
            <span className="metric-tag">Pydantic Schemas</span>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>📊 Feature Engineering Matrix</h2>
        <p>The model ingests 16 predictive features across demographics, credit history, and loan parameters:</p>
        <div className="tag-list">
          {["Age", "Income", "LoanAmount", "CreditScore", "MonthsEmployed", "NumCreditLines",
            "InterestRate", "LoanTerm", "DebtToIncomeRatio", "Education", "EmploymentType", "MaritalStatus",
            "HasMortgage", "HasDependents", "LoanPurpose", "HasCoSigner"].map((t) => (
            <span className="tag-pill" key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2>⚙️ Full Stack Technology Stack</h2>
        <div className="tag-list">
          {["React 19", "Vite", "React Router 7", "FastAPI", "Python 3.13", "scikit-learn 1.6", "Joblib", "Pydantic", "Vanilla CSS3"].map((t) => (
            <span className="tag-pill tech" key={t}>🔹 {t}</span>
          ))}
        </div>
      </div>

      <div className="disclaimer-card">
        <div className="disclaimer-title">⚠️ Disclaimer & Regulatory Compliance</div>
        <p>
          LoanGuard AI is an automated statistical demonstration system. Predictions produced by this model are intended for educational, research, and technical evaluation purposes only and should not be used as the sole determinant for real-world lending or credit decisions.
        </p>
      </div>
    </div>
  );
}

