import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="not-found-actions">
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go to Dashboard
        </button>
        <button
          onClick={() => navigate("/candidates")}
          className="btn btn-success"
        >
          View Candidates
        </button>
      </div>
    </div>
  );
};
