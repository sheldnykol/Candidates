import React, { useState, useEffect, type ReactNode } from "react";
import { CandidateContext } from "./candidateContext";
import type { Candidate } from "../types/candidate";
import * as candidateApi from "../services/candidateApi";

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates on mount
  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await candidateApi.fetchCandidates();
      setCandidates(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load candidates"
      );
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (candidateData: Omit<Candidate, "id">) => {
    try {
      setError(null);

      const newCandidate = await candidateApi.createCandidate(candidateData);
      setCandidates((prev) => [...prev, newCandidate]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add candidate");

      throw err;
    }
  };

  const updateCandidate = async (id: number, updates: Partial<Candidate>) => {
    try {
      setError(null);
      const updatedCandidate = await candidateApi.updateCandidate(id, updates);
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === id ? updatedCandidate : candidate
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update candidate"
      );

      throw err;
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      setError(null);
      await candidateApi.deleteCandidate(id);
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete candidate"
      );

      throw err;
    }
  };

  const getCandidateById = (id: number): Candidate | undefined => {
    return candidates.find((candidate) => candidate.id === id);
  };

  const getCandidatesByStatus = (status: string): Candidate[] => {
    if (status === "all") return candidates;
    return candidates.filter((candidate) => candidate.status === status);
  };

  const searchCandidates = (searchTerm: string): Candidate[] => {
    const term = searchTerm.toLowerCase();
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term) ||
        candidate.position.toLowerCase().includes(term)
    );
  };

  const refreshCandidates = async () => {
    await loadCandidates();
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        error,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        getCandidateById,
        getCandidatesByStatus,
        searchCandidates,
        refreshCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
