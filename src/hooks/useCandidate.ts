import { useContext } from "react";
import { CandidateContext } from "../context/candidateContext";

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context)
    throw new Error("useCandidate must be used within CandidateProvider");
  return context;
};
