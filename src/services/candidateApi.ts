/**
 * API Service for Candidate Management
 *
 * This service handles all HTTP requests to the JSON Server backend using Axios
 * Base URL: http://localhost:3001
 */

import axios from "axios";
import type { Candidate } from "../types/candidate";
const candidate_route = "/candidates";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Simulated API delay for testing loading states
 * Set to 0 to disable delay
 * Adjust this value to simulate different network conditions
 */
let API_DELAY_MS = 0;

/**
 * Set the artificial delay for API calls (in milliseconds)
 * Useful for testing loading indicators and spinners
 * @param delayMs - Delay in milliseconds (0 to disable)
 */
export const setApiDelay = (delayMs: number): void => {
  API_DELAY_MS = delayMs;
};

/**
 * Get the current API delay setting
 */
export const getApiDelay = (): number => {
  return API_DELAY_MS;
};

/**
 * Helper function to add artificial delay to API calls
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/**
 * Fetch all candidates from the API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.get<Candidate[]>(candidate_route);
  return response.data;
};
/**
 * Fetch a single candidate by ID
 */
export const fetchCandidateById = async (id: number): Promise<Candidate> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.get<Candidate>(`${candidate_route}/${id}`);
  return response.data;
};

/**
 * Create a new candidate
 */
export const createCandidate = async (
  candidate: Omit<Candidate, "id">
): Promise<Candidate> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.post<Candidate>(candidate_route, candidate);
  return response.data;
};

/**
 * Update an existing candidate (partial update)
 */
export const updateCandidate = async (
  id: number,
  updates: Partial<Candidate>
): Promise<Candidate> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.patch<Candidate>(
    `${candidate_route}/${id}`,
    updates
  );
  return response.data;
};

/**
 * Delete a candidate
 */
export const deleteCandidate = async (id: number): Promise<void> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  await api.delete(`${candidate_route}/${id}`);
};

/**
 * Search candidates by query (name, email, position)
 */
export const searchCandidates = async (query: string): Promise<Candidate[]> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.get<Candidate[]>(candidate_route, {
    params: { q: query },
  });
  return response.data;
};

/**
 * Filter candidates by status
 */
export const fetchCandidatesByStatus = async (
  status: string
): Promise<Candidate[]> => {
  if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
  const response = await api.get<Candidate[]>(candidate_route, {
    params: { status },
  });
  return response.data;
};
