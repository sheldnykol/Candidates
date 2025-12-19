import React from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import type { Candidate } from "../../../../types/candidate";
import { CandidateForm } from "../../Phase-1/features/CandidateForm";

export const AddCandidatePage: React.FC = () => {
  const navigate = useNavigate();

  const { addCandidate } = useCandidate();

  const handleSubmit = (data: Omit<Candidate, "id">) => {
    const newData: Candidate = { id: `${Date.now()}`, ...data };

    addCandidate(newData);
    navigate("/candidates");
  };

  const handleCancel = () => {
    navigate("/candidates");
  };

  return (
    <div className="form-wrapper">
      <h1 className="page-header">Add New Candidate</h1>

      <CandidateForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};
