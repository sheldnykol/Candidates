/**
 * API Service for Candidate Management
 *
 * This service handles all HTTP requests to the JSON Server backend using Axios
 * Base URL: http://localhost:3001
 */

import axios from "axios";
import type { Candidate } from "../types/candidate";

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
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.get<Candidate[]>("/candidates");
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};
/**
 * Fetch a single candidate by ID
 */
export const fetchCandidateById = async (id: number): Promise<Candidate> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.get<Candidate>(`/candidates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching candidate ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new candidate
 */
export const createCandidate = async (
  candidate: Omit<Candidate, "id">
): Promise<Candidate> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.post<Candidate>("/candidates", candidate);
    return response.data;
  } catch (error) {
    console.error("Error creating candidate:", error);
    throw error;
  }
};

/**
 * Update an existing candidate (partial update)
 */
export const updateCandidate = async (
  id: number,
  updates: Partial<Candidate>
): Promise<Candidate> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.patch<Candidate>(`/candidates/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating candidate ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a candidate
 */
export const deleteCandidate = async (id: number): Promise<void> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    await api.delete(`/candidates/${id}`);
  } catch (error) {
    console.error(`Error deleting candidate ${id}:`, error);
    throw error;
  }
};

/**
 * Search candidates by query (name, email, position)
 */
export const searchCandidates = async (query: string): Promise<Candidate[]> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.get<Candidate[]>("/candidates", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching candidates:", error);
    throw error;
  }
};

/**
 * Filter candidates by status
 */
export const fetchCandidatesByStatus = async (
  status: string
): Promise<Candidate[]> => {
  try {
    if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
    const response = await api.get<Candidate[]>("/candidates", {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching candidates by status ${status}:`, error);
    throw error;
  }
};
