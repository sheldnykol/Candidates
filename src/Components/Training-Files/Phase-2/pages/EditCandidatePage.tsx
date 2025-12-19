import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { CandidateForm } from "../../Phase-1/features/CandidateForm";
import type { Candidate } from "../../../../types/candidate";
import * as candidateApi from "../../../../services/candidateApi";

export const EditCandidatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="form-wrapper column-center">
        <p>Loading candidate details...</p>
      </div>
    );
  }

  const handleSubmit = async (data: Omit<Candidate, "id">) => {
    try {
      setSubmitError(null);
      await updateCandidate(Number(candidate.id), data);
      navigate(`/candidates/${candidate.id}`);
    } catch {
      setSubmitError("Candidate was not updated");
    }
  };

  const handleCancel = () => {
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <div className="form-wrapper">
      <h1 className="page-header">Edit Candidate: {candidate.name}</h1>
      {submitError && (
        <div className="error-box">
          <p>{submitError}</p>
        </div>
      )}

      <CandidateForm
        initialData={candidate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
