import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <div className="brand-icon">
          <span>🛡️</span>
        </div>
        <span className="brand-text">LoanGuard <span className="dot">AI</span></span>
        <span className="status-pill">
          <span className="pulse-dot"></span> Model Ready
        </span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>🏠</span> Overview
        </NavLink>
        <NavLink to="/predict" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>⚡</span> Predict Risk
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>📖</span> Architecture
        </NavLink>
      </div>
    </nav>
  );
}

