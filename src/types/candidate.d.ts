export type CandidateStatus = "pending" | "approved" | "rejected" | "on-hold";

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: CandidateStatus;
  skills: string[];
  experience: number;
  rating: number;
  appliedDate: string;
  interviewDate: string | null;
  notes: string;
  yearlySalary: number;
  location: string;
  education: string;
}
