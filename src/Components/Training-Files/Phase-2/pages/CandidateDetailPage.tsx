import { useNavigate, useParams } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { useEffect, useState } from "react";
import type { Candidate } from "../../../../types/candidate";
import * as candidateApi from "../../../../services/candidateApi";
// eslint-disable-next-line max-statements
export const CandidateDetailPage: React.FC = () => {
  // TODO 1: Get id from URL params
  // HINT: const { id } = useParams<{ id: string }>();
  // Your code here
  const { id } = useParams<{ id: string }>();
  const candidate_route = "/candidates";

  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here
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

  // TODO 3: Get getCandidateById and deleteCandidate from useCandidate hook
  // HINT: const { getCandidateById, deleteCandidate } = useCandidate();
  // Your code here

  // TODO 4: Get the candidate by id
  // HINT: const candidate = getCandidateById(Number(id));
  // Your code here
  //const candidate = getCandidateById(Number(id));
  //console.log("candidate", candidate, typeof id);
  // TODO 5: Add check if candidate doesn't exist
  // HINT: If !candidate, return not found message
  // Structure same as EditCandidatePage
  // Your not found check here

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
  // TODO 6: Create handleEdit function
  // HINT: Navigate to `/candidates/${candidate.id}/edit`
  const handleEdit = () => {
    navigate(`/candidates/${candidate.id}/edit`);
  };

  // TODO 7: Create handleDelete function
  // HINT: Show confirmation dialog, then deleteCandidate(candidate.id) and navigate("/candidates")
  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure you want to delete this candidate?"))
      deleteCandidate(Number(candidate.id));
    navigate(candidate_route);
  };

  // TODO 8: Create handleBack function
  // HINT: Navigate to "/candidates"
  const handleBack = () => {
    navigate(candidate_route);
  };

  return (
    <div className="detail-container">
      {/* TODO 9: Create detail header */}
      {/* HINT: Use div with className="detail-header" */}
      <div className="detail-header">
        {/* TODO 10: Add candidate name and status badge */}
        {/* Structure:
            <h1 className="page-title">{candidate.name}</h1>
            <span className={`status-badge-large status-badge-${candidate.status}`}>
              {candidate.status}
            </span>
        */}
        {/* Your header content here */}
        <h1 className="page-title">{candidate.name}</h1>
        <span className={`status-badge-large status-badge-${candidate.status}`}>
          {candidate.status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      {/* TODO 11: Create Contact Information section */}
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

      {/* TODO 13: Create Professional Information section */}
      <div className="detail-section">
        <h2 className="section-title">Professional Information</h2>
        <div className="detail-grid">
          {/* TODO 14: Add professional fields */}
          {/* Fields: Position, Education, Experience (years), Yearly Salary (formatted with $), Rating (out of 5) */}
          {/* Your professional fields here */}
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

      {/* TODO 15: Create Skills section */}
      <div className="detail-section">
        <h2 className="section-title">Skills</h2>
        {/* TODO 16: Map through skills and display as badges */}
        {/* HINT: 
            <div className="skills-container">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
        */}
        {/* Your skills here */}
        <div className="skills-container">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* TODO 17: Create Application Details section */}
      <div className="detail-section">
        <h2 className="section-title">Application Details</h2>
        <div className="detail-grid">
          {/* TODO 18: Add application fields */}
          {/* Fields: Applied Date, Interview Date (or "Not scheduled" if null) */}
          {/* Your application fields here */}
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

      {/* TODO 19: Create Notes section if notes exist */}
      {/* HINT: Only show if candidate.notes is not empty */}
      {/* Structure:
          {candidate.notes && (
            <div className="detail-section">
              <h2 className="section-title">Notes</h2>
              <div className="detail-notes">{candidate.notes}</div>
            </div>
          )}
      */}
      {/* Your notes section here */}
      {candidate.notes && (
        <div className="detail-section">
          <h2 className="section-title">Notes</h2>
          <div className="detail-notes">{candidate.notes}</div>
        </div>
      )}

      {/* TODO 20: Create action buttons */}
      <div className="detail-actions">
        {/* TODO 21: Add three buttons */}
        {/* 1. Back button (btn-secondary) → handleBack */}
        {/* 2. Edit button (btn-primary) → handleEdit */}
        {/* 3. Delete button (btn-danger) → handleDelete */}
        {/* Your buttons here */}
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
