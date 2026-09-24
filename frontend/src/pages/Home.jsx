import { useNavigate } from "react-router-dom";

const features = [
  { icon: "⚡", title: "Sub-Second Inference", desc: "Get real-time loan default probability in under 50ms powered by FastAPI and optimized scikit-learn backend." },
  { icon: "🎯", title: "Enterprise Accuracy", desc: "Tuned Random Forest ensemble model trained on 255,000+ real financial loan applications." },
  { icon: "🔒", title: "Zero Data Retention", desc: "Privacy-focused architecture. Data is processed strictly in-memory during prediction." },
  { icon: "📊", title: "Granular Risk Probabilities", desc: "Provides numerical risk probabilities and threshold-tuned binary classification outputs." },
  { icon: "🧠", title: "Automated DTI Calculation", desc: "Dynamic feature computation calculates Debt-to-Income and maps categoricals on-the-fly." },
  { icon: "🌐", title: "RESTful API Architecture", desc: "Modular backend endpoints ready for integration with banking pipelines and dashboard webhooks." },
];

const steps = [
  { title: "Input Financial Profile", desc: "Fill in key parameters such as annual income, loan amount, credit score, interest rate, and employment details." },
  { title: "Multi-Feature ML Analysis", desc: "Random Forest engine normalizes numerical metrics and one-hot encodes 16 predictive features." },
  { title: "Real-Time Risk Decision", desc: "Instantly view default probability percentage along with risk classification and applicant summary." },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Background Mesh Orbs */}
      <div className="bg-glow orb-1" />
      <div className="bg-glow orb-2" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-sparkle">✦</span> Enterprise-Grade ML Risk Intelligence
        </div>
        
        <h1>
          Predict Loan Defaults <br />
          <span className="gradient-text">Before Capital Exposure</span>
        </h1>
        
        <p className="hero-subtitle">
          Empowering financial institutions and credit risk teams with AI-driven default prediction, trained on over 255,000 credit profiles.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => navigate("/predict")}>
            <span>⚡ Run Risk Assessment</span>
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-outline" onClick={() => navigate("/about")}>
            <span>📚 Model Specifications</span>
          </button>
        </div>

        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-bg">📈</div>
            <div className="stat-val">255,000+</div>
            <div className="stat-label">Training Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-bg">🎯</div>
            <div className="stat-val">84.3%</div>
            <div className="stat-label">Model Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-bg">⚡</div>
            <div className="stat-val">&lt; 50ms</div>
            <div className="stat-label">Response Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-bg">🌲</div>
            <div className="stat-val">100 Trees</div>
            <div className="stat-label">Random Forest</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="section">
        <div className="section-header">
          <div className="section-tag">Key Capabilities</div>
          <h2 className="section-title">Built for Modern Risk Analytics</h2>
          <p className="section-sub">Engineered with high performance, precision scoring, and clean UI responsiveness.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">Workflow</div>
          <h2 className="section-title">How LoanGuard Works</h2>
          <p className="section-sub">Three streamlined steps from raw metrics to actionable credit decisions.</p>
        </div>
        <div className="steps-container">
          {steps.map((s, i) => (
            <div className="step-card" key={s.title}>
              <div className="step-badge">0{i + 1}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="cta-banner">
        <div className="cta-content">
          <h2>Ready to Evaluate a Loan Application?</h2>
          <p>Instantly score credit profiles with our trained Random Forest classifier.</p>
        </div>
        <button className="btn-primary glow-btn" onClick={() => navigate("/predict")}>
          Launch Risk Calculator 🚀
        </button>
      </div>

      <footer className="footer">
        <div className="footer-brand">LoanGuard<span className="dot">AI</span></div>
        <p>© 2026 LoanGuard AI Risk Platform · FastAPI & React 19 Engine</p>
      </footer>
    </div>
  );
}

