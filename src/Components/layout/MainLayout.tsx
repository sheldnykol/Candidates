import React, { useState } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Candidate Directory</h1>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <nav className="layout-nav">
        <div className={`layout-nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/candidates" className="nav-link" onClick={toggleMenu}>
            Candidates
          </Link>
          <Link to="/add" className="nav-link" onClick={toggleMenu}>
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
