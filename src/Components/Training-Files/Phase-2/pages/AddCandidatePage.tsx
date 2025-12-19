import React from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import type { Candidate } from "../../../../types/candidate";
import { CandidateForm } from "../../Phase-1/features/CandidateForm";

export const AddCandidatePage: React.FC = () => {
  // TODO 1: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here
  const navigate = useNavigate();

  // TODO 2: Get addCandidate function from useCandidate hook
  // HINT: const { addCandidate } = useCandidate();
  // Your code here
  const { addCandidate } = useCandidate();
  // TODO 3: Create handleSubmit function
  // HINT: Takes data: Omit<Candidate, "id">
  // Call addCandidate(data) then navigate("/candidates")
  // const handleSubmit = (data: Omit<Candidate, "id">) => {
  //   // Your code here
  // };
  const handleSubmit = (data: Omit<Candidate, "id">) => {
    const newData: Candidate = { id: `${Date.now()}`, ...data };
    ///console.log("newData", newData);
    addCandidate(newData);
    navigate("/candidates");
  };

  // TODO 4: Create handleCancel function
  // HINT: Navigate to "/candidates"
  // const handleCancel = () => {
  //   // Your code here
  // };
  const handleCancel = () => {
    navigate("/candidates");
  };

  return (
    <div className="form-wrapper">
      {/* TODO 5: Add page header */}
      {/* HINT: <h1 className="page-header">Add New Candidate</h1> */}
      {/* Your header here */}
      <h1 className="page-header">Add New Candidate</h1>
      {/* TODO 6: Add CandidateForm component */}
      {/* HINT: Pass onSubmit and onCancel props (no initialData) */}
      {/* Your CandidateForm here */}
      <CandidateForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};
