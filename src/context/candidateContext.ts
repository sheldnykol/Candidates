import { createContext } from "react";
import type { Candidate } from "../types/candidate";

export interface CandidateContextType {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  addCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>;
  updateCandidate: (id: number, updates: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
  getCandidateById: (id: number) => Candidate | undefined;
  getCandidatesByStatus: (status: string) => Candidate[];
  searchCandidates: (searchTerm: string) => Candidate[];
  refreshCandidates: () => Promise<void>;
}

export const CandidateContext = createContext<CandidateContextType | undefined>(
  undefined
);
