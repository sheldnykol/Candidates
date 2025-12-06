import React from "react";

export const AddCandidatePage: React.FC = () => {
  // TODO 1: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here

  // TODO 2: Get addCandidate function from useCandidate hook
  // HINT: const { addCandidate } = useCandidate();
  // Your code here

  // TODO 3: Create handleSubmit function
  // HINT: Takes data: Omit<Candidate, "id">
  // Call addCandidate(data) then navigate("/candidates")
  // const handleSubmit = (data: Omit<Candidate, "id">) => {
  //   // Your code here
  // };

  // TODO 4: Create handleCancel function
  // HINT: Navigate to "/candidates"
  // const handleCancel = () => {
  //   // Your code here
  // };

  return (
    <div className="form-wrapper">
      {/* TODO 5: Add page header */}
      {/* HINT: <h1 className="page-header">Add New Candidate</h1> */}
      {/* Your header here */}

      {/* TODO 6: Add CandidateForm component */}
      {/* HINT: Pass onSubmit and onCancel props (no initialData) */}
      {/* Your CandidateForm here */}
    </div>
  );
};
