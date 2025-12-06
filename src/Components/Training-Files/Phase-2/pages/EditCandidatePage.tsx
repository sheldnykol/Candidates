import React from "react";

export const EditCandidatePage: React.FC = () => {
  // TODO 1: Get id from URL params
  // HINT: const { id } = useParams<{ id: string }>();
  // Your code here

  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here

  // TODO 3: Get getCandidateById and updateCandidate from useCandidate hook
  // HINT: const { getCandidateById, updateCandidate } = useCandidate();
  // Your code here

  // TODO 4: Get the candidate by id
  // HINT: const candidate = getCandidateById(Number(id));
  // Your code here

  // TODO 5: Add check if candidate doesn't exist
  // HINT: If !candidate, return a not found message with button to go back
  // Structure:
  /*
    <div className="not-found-container">
      <h2 className="error-title">Candidate Not Found</h2>
      <p className="error-text">The candidate you're trying to edit doesn't exist.</p>
      <button onClick={() => navigate("/candidates")} className="btn btn-primary">
        Back to Candidates
      </button>
    </div>
  */
  // Your not found check here

  // TODO 6: Create handleSubmit function
  // HINT: Takes data: Omit<Candidate, "id">
  // Call updateCandidate(candidate.id, data)
  // Navigate to `/candidates/${candidate.id}`
  // const handleSubmit = (data: Omit<Candidate, "id">) => {
  //   // Your code here
  // };

  // TODO 7: Create handleCancel function
  // HINT: Navigate to `/candidates/${candidate.id}`
  // const handleCancel = () => {
  //   // Your code here
  // };

  return (
    <div className="form-wrapper">
      {/* TODO 8: Add page header with candidate name */}
      {/* HINT: <h1 className="page-header">Edit Candidate: {candidate.name}</h1> */}
      {/* Your header here */}

      {/* TODO 9: Add CandidateForm component */}
      {/* HINT: Pass initialData={candidate}, onSubmit, and onCancel props */}
      {/* Your CandidateForm here */}
    </div>
  );
};
