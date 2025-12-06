import React from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Candidate Directory</h1>
      </header>

      <nav className="layout-nav">
        <div className="layout-nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/candidates" className="nav-link">
            Candidates
          </Link>
          <Link to="/add" className="nav-link">
            Add Candidate
          </Link>
        </div>
      </nav>

      <main className="layout-main">{children}</main>

      <footer className="layout-footer">
        <p>© 2025 Candidate Directory. All rights reserved.</p>
      </footer>
    </div>
  );
};
