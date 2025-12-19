import { useNavigate, useParams } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { useEffect, useState } from "react";
import type { Candidate } from "../../../../types/candidate";
import * as candidateApi from "../../../../services/candidateApi";
// eslint-disable-next-line max-statements
export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const candidate_route = "/candidates";

  const navigate = useNavigate();
  const { getCandidateById, deleteCandidate } = useCandidate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line max-statements
    const loadCandidate = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }
      const contextCandidate = getCandidateById(Number(id));
      if (contextCandidate) {
        setCandidate(contextCandidate);
        setError(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const fetched = await candidateApi.fetchCandidateById(Number(id));
        setCandidate(fetched);
        setError(null);
      } catch {
        setCandidate(null);
        setError("Candidate not found");
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, [id, getCandidateById]);

  if (error || !candidate) {
    return (
      <div className="not-found-container">
        <h2 className="error-title">Candidate Not Found</h2>
        <p className="error-text">
          The candidate you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate(candidate_route)}
          className="btn btn-primary"
        >
          Back to Candidates
        </button>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="form-wrapper column-center">
        <p>Loading candidate details...</p>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/candidates/${candidate.id}/edit`);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure you want to delete this candidate?"))
      deleteCandidate(Number(candidate.id));
    navigate(candidate_route);
  };

  const handleBack = () => {
    navigate(candidate_route);
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1 className="page-title">{candidate.name}</h1>
        <span className={`status-badge-large status-badge-${candidate.status}`}>
          {candidate.status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Contact Information</h2>
        <div className="detail-grid">
          <div className="detail-label">Email</div>
          <div className="detail-value">
            <a href={`mailto:${candidate.email}`} className="detail-link">
              {candidate.email}
            </a>
          </div>
          <div className="detail-label">Phone</div>
          <div className="detail-value">
            <a href="" className="detail-link">
              {candidate.phone || "No exist"}
            </a>
          </div>
          <div className="detail-label">Location</div>
          <div className="detail-value">
            <a href="" className="detail-link">
              {candidate.location || "No exist"}
            </a>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Professional Information</h2>
        <div className="detail-grid">
          <div>
            <span className="detail-label">Education</span>
            <p className="detail-value">{candidate.education}</p>
          </div>
          <div>
            <span className="detail-label">Phone</span>
            <p className="detail-value">{candidate.phone || "No exist"}</p>
          </div>
          <div>
            <span className="detail-label">Position</span>
            <p className="detail-value">{candidate.position}</p>
          </div>
          <div>
            <span className="detail-label">Location</span>
            <p className="detail-value">{candidate.location || "No exist"}</p>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Skills</h2>

        <div className="skills-container">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Application Details</h2>
        <div className="detail-grid">
          <div>
            <span className="detail-label">Applied Date</span>
            <p className="detail-value">{candidate.appliedDate}</p>
          </div>
          <div>
            <span className="detail-label">Interview Date</span>
            <p className="detail-value">
              {candidate.interviewDate || "Not scheduled"}
            </p>
          </div>
        </div>
      </div>

      {candidate.notes && (
        <div className="detail-section">
          <h2 className="section-title">Notes</h2>
          <div className="detail-notes">{candidate.notes}</div>
        </div>
      )}

      <div className="detail-actions">
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={handleBack}>
            Back to Candidates
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
