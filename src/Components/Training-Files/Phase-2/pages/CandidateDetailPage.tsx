import React from "react";

export const CandidateDetailPage: React.FC = () => {
  // TODO 1: Get id from URL params
  // HINT: const { id } = useParams<{ id: string }>();
  // Your code here

  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here

  // TODO 3: Get getCandidateById and deleteCandidate from useCandidate hook
  // HINT: const { getCandidateById, deleteCandidate } = useCandidate();
  // Your code here

  // TODO 4: Get the candidate by id
  // HINT: const candidate = getCandidateById(Number(id));
  // Your code here

  // TODO 5: Add check if candidate doesn't exist
  // HINT: If !candidate, return not found message
  // Structure same as EditCandidatePage
  // Your not found check here

  // TODO 6: Create handleEdit function
  // HINT: Navigate to `/candidates/${candidate.id}/edit`
  // const handleEdit = () => {
  //   // Your code here
  // };

  // TODO 7: Create handleDelete function
  // HINT: Show confirmation dialog, then deleteCandidate(candidate.id) and navigate("/candidates")
  // const handleDelete = () => {
  //   // Your code here
  // };

  // TODO 8: Create handleBack function
  // HINT: Navigate to "/candidates"
  // const handleBack = () => {
  //   // Your code here
  // };

  return (
    <div>
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
      </div>

      {/* TODO 11: Create Contact Information section */}
      <div className="detail-section">
        <h2 className="section-title">Contact Information</h2>
        <div className="detail-grid">
          {/* TODO 12: Add Email field with mailto link */}
          {/* Structure:
              <div>
                <div className="detail-label">Email</div>
                <div className="detail-value">
                  <a href={`mailto:${candidate.email}`} className="detail-link">
                    {candidate.email}
                  </a>
                </div>
              </div>
          */}
          {/* Your contact fields here (email, phone, location) */}
        </div>
      </div>

      {/* TODO 13: Create Professional Information section */}
      <div className="detail-section">
        <h2 className="section-title">Professional Information</h2>
        <div className="detail-grid">
          {/* TODO 14: Add professional fields */}
          {/* Fields: Position, Education, Experience (years), Yearly Salary (formatted with $), Rating (out of 5) */}
          {/* Your professional fields here */}
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
      </div>

      {/* TODO 17: Create Application Details section */}
      <div className="detail-section">
        <h2 className="section-title">Application Details</h2>
        <div className="detail-grid">
          {/* TODO 18: Add application fields */}
          {/* Fields: Applied Date, Interview Date (or "Not scheduled" if null) */}
          {/* Your application fields here */}
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

      {/* TODO 20: Create action buttons */}
      <div className="detail-actions">
        {/* TODO 21: Add three buttons */}
        {/* 1. Back button (btn-secondary) → handleBack */}
        {/* 2. Edit button (btn-primary) → handleEdit */}
        {/* 3. Delete button (btn-danger) → handleDelete */}
        {/* Your buttons here */}
      </div>
    </div>
  );
};
