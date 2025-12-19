import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { CandidateForm } from "../../Phase-1/features/CandidateForm";
import type { Candidate } from "../../../../types/candidate";
import * as candidateApi from "../../../../services/candidateApi";

export const EditCandidatePage: React.FC = () => {
  // TODO 1: Get id from URL params
  // HINT: const { id } = useParams<{ id: string }>();
  // Your code here
  const { id } = useParams<{ id: string }>();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here
  const navigate = useNavigate();
  const { getCandidateById, updateCandidate } = useCandidate();

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

  if (loading) {
    return (
      <div className="form-wrapper column-center">
        <p>Loading candidate details...</p>
      </div>
    );
  }
  // TODO 3: Get getCandidateById and updateCandidate from useCandidate hook
  // HINT: const { getCandidateById, updateCandidate } = useCandidate();
  // Your code here

  // TODO 4: Get the candidate by id
  // HINT: const candidate = getCandidateById(Number(id));
  // Your code here
  ////const candidate = getCandidateById(Number(id));

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
  if (error || !candidate) {
    return (
      <div className="not-found-container">
        <h2 className="error-title">Candidate Not Found</h2>
        <p className="error-text">
          The candidate you're trying to edit doesn't exist.
        </p>
        <button
          onClick={() => navigate("/candidates")}
          className="btn btn-primary"
        >
          Back to Candidates
        </button>
      </div>
    );
  }

  // TODO 6: Create handleSubmit function
  // HINT: Takes data: Omit<Candidate, "id">
  // Call updateCandidate(candidate.id, data)
  // Navigate to
  // const handleSubmit = (data: Omit<Candidate, "id">) => {
  //   // Your code here
  // };
  const handleSubmit = async (data: Omit<Candidate, "id">) => {
    try {
      setSubmitError(null);
      await updateCandidate(candidate.id, data);
      navigate(`/candidates/${candidate.id}`);
    } catch {
      setSubmitError("Candidate was not updated");
    }
  };

  // TODO 7: Create handleCancel function
  // HINT: Navigate to `/candidates/${candidate.id}`
  // const handleCancel = () => {
  //   // Your code here
  // };
  const handleCancel = () => {
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <div className="form-wrapper">
      {/* TODO 8: Add page header with candidate name */}
      {/* HINT: <h1 className="page-header">Edit Candidate: {candidate.name}</h1> */}
      {/* Your header here */}
      <h1 className="page-header">Edit Candidate: {candidate.name}</h1>
      {submitError && (
        <div className="error-box">
          <p>{submitError}</p>
        </div>
      )}

      {/* TODO 9: Add CandidateForm component */}
      {/* HINT: Pass initialData={candidate}, onSubmit, and onCancel props */}
      {/* Your CandidateForm here */}
      <CandidateForm
        initialData={candidate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
