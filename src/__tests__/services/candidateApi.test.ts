/**
 * Unit tests for candidateApi service
 * Tests all API functions with mocked axios calls
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Candidate } from "../../types/candidate";

// Mock axios before importing candidateApi
vi.mock("axios", () => {
  const mockGet = vi.fn();
  const mockPost = vi.fn();
  const mockPatch = vi.fn();
  const mockDelete = vi.fn();

  return {
    default: {
      create: () => ({
        get: mockGet,
        post: mockPost,
        patch: mockPatch,
        delete: mockDelete,
      }),
    },
  };
});

// Import after mocking
import axios from "axios";
import {
  fetchCandidates,
  fetchCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  searchCandidates,
  fetchCandidatesByStatus,
  setApiDelay,
  getApiDelay,
} from "../../services/candidateApi";

// Get mock instance after import
const mockAxiosInstance = axios.create();
const mockGet = mockAxiosInstance.get as ReturnType<typeof vi.fn>;
const mockPost = mockAxiosInstance.post as ReturnType<typeof vi.fn>;
const mockPatch = mockAxiosInstance.patch as ReturnType<typeof vi.fn>;
const mockDelete = mockAxiosInstance.delete as ReturnType<typeof vi.fn>;

describe("candidateApi", () => {
  // Sample test data
  const mockCandidate: Candidate = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    position: "Frontend Developer",
    status: "pending",
    skills: ["React", "TypeScript"],
    experience: 3,
    rating: 4,
    appliedDate: "2024-01-15",
    interviewDate: null,
    notes: "Strong candidate",
    yearlySalary: 75000,
    location: "New York",
    education: "Bachelor's in CS",
  };

  const mockCandidates: Candidate[] = [
    mockCandidate,
    {
      ...mockCandidate,
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "approved",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset API delay before each test
    setApiDelay(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("API Delay Configuration", () => {
    it("should set and get API delay", () => {
      setApiDelay(500);
      expect(getApiDelay()).toBe(500);
    });

    it("should default to 0 delay", () => {
      expect(getApiDelay()).toBe(0);
    });

    it("should allow setting delay to 0", () => {
      setApiDelay(1000);
      setApiDelay(0);
      expect(getApiDelay()).toBe(0);
    });
  });

  describe("fetchCandidates", () => {
    it("should fetch all candidates successfully", async () => {
      mockGet.mockResolvedValueOnce({ data: mockCandidates });

      const result = await fetchCandidates();

      expect(mockGet).toHaveBeenCalledWith("/candidates");
      expect(result).toEqual(mockCandidates);
    });

    it("should throw error when fetch fails", async () => {
      const error = new Error("Network error");
      mockGet.mockRejectedValueOnce(error);

      await expect(fetchCandidates()).rejects.toThrow("Network error");
      expect(mockGet).toHaveBeenCalledWith("/candidates");
    });

    it("should return empty array when no candidates exist", async () => {
      mockGet.mockResolvedValueOnce({ data: [] });

      const result = await fetchCandidates();

      expect(result).toEqual([]);
    });

    it("should apply delay when configured", async () => {
      setApiDelay(100);
      mockGet.mockResolvedValueOnce({ data: mockCandidates });

      const startTime = Date.now();
      await fetchCandidates();
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeGreaterThanOrEqual(100);
    });
  });

  describe("fetchCandidateById", () => {
    it("should fetch a single candidate by ID", async () => {
      mockGet.mockResolvedValueOnce({ data: mockCandidate });

      const result = await fetchCandidateById(1);

      expect(mockGet).toHaveBeenCalledWith("/candidates/1");
      expect(result).toEqual(mockCandidate);
    });

    it("should throw error when candidate not found", async () => {
      const error = new Error("Candidate not found");
      mockGet.mockRejectedValueOnce(error);

      await expect(fetchCandidateById(999)).rejects.toThrow(
        "Candidate not found"
      );
      expect(mockGet).toHaveBeenCalledWith("/candidates/999");
    });

    it("should handle different candidate IDs", async () => {
      mockGet.mockResolvedValueOnce({
        data: { ...mockCandidate, id: 42 },
      });

      const result = await fetchCandidateById(42);

      expect(mockGet).toHaveBeenCalledWith("/candidates/42");
      expect(result.id).toBe(42);
    });
  });

  describe("createCandidate", () => {
    it("should create a new candidate successfully", async () => {
      const newCandidate = { ...mockCandidate };
      delete (newCandidate as any).id;

      mockPost.mockResolvedValueOnce({ data: mockCandidate });

      const result = await createCandidate(newCandidate);

      expect(mockPost).toHaveBeenCalledWith("/candidates", newCandidate);
      expect(result).toEqual(mockCandidate);
      expect(result.id).toBeDefined();
    });

    it("should throw error when creation fails", async () => {
      const newCandidate = { ...mockCandidate };
      delete (newCandidate as any).id;

      const error = new Error("Validation error");
      mockPost.mockRejectedValueOnce(error);

      await expect(createCandidate(newCandidate)).rejects.toThrow(
        "Validation error"
      );
    });

    it("should create candidate with minimal required fields", async () => {
      const minimalCandidate = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-0000",
        position: "Developer",
        status: "pending" as const,
        skills: [],
        experience: 0,
        rating: 0,
        appliedDate: "2024-01-01",
        interviewDate: null,
        notes: "",
        yearlySalary: 0,
        location: "",
        education: "",
      };

      mockPost.mockResolvedValueOnce({
        data: { ...minimalCandidate, id: 999 },
      });

      const result = await createCandidate(minimalCandidate);

      expect(result.id).toBe(999);
      expect(result.name).toBe("Test User");
    });
  });

  describe("updateCandidate", () => {
    it("should update candidate with partial data", async () => {
      const updates = { status: "approved" as const, rating: 5 };
      const updatedCandidate = { ...mockCandidate, ...updates };

      mockPatch.mockResolvedValueOnce({
        data: updatedCandidate,
      });

      const result = await updateCandidate(1, updates);

      expect(mockPatch).toHaveBeenCalledWith("/candidates/1", updates);
      expect(result.status).toBe("approved");
      expect(result.rating).toBe(5);
    });

    it("should update single field", async () => {
      const updates = { notes: "Updated notes" };
      mockPatch.mockResolvedValueOnce({
        data: { ...mockCandidate, ...updates },
      });

      const result = await updateCandidate(1, updates);

      expect(result.notes).toBe("Updated notes");
    });

    it("should throw error when update fails", async () => {
      const updates = { status: "approved" as const };
      const error = new Error("Update failed");

      mockPatch.mockRejectedValueOnce(error);

      await expect(updateCandidate(1, updates)).rejects.toThrow(
        "Update failed"
      );
    });

    it("should handle updating non-existent candidate", async () => {
      const updates = { status: "approved" as const };
      const error = new Error("Candidate not found");

      mockPatch.mockRejectedValueOnce(error);

      await expect(updateCandidate(999, updates)).rejects.toThrow(
        "Candidate not found"
      );
    });

    it("should update multiple fields at once", async () => {
      const updates = {
        status: "approved" as const,
        rating: 5,
        notes: "Excellent candidate",
        interviewDate: "2024-02-01",
      };

      mockPatch.mockResolvedValueOnce({
        data: { ...mockCandidate, ...updates },
      });

      const result = await updateCandidate(1, updates);

      expect(result.status).toBe("approved");
      expect(result.rating).toBe(5);
      expect(result.notes).toBe("Excellent candidate");
      expect(result.interviewDate).toBe("2024-02-01");
    });
  });

  describe("deleteCandidate", () => {
    it("should delete candidate successfully", async () => {
      mockDelete.mockResolvedValueOnce({ data: {} });

      await deleteCandidate(1);

      expect(mockDelete).toHaveBeenCalledWith("/candidates/1");
    });

    it("should throw error when deletion fails", async () => {
      const error = new Error("Delete failed");
      mockDelete.mockRejectedValueOnce(error);

      await expect(deleteCandidate(1)).rejects.toThrow("Delete failed");
    });

    it("should handle deleting non-existent candidate", async () => {
      const error = new Error("Candidate not found");
      mockDelete.mockRejectedValueOnce(error);

      await expect(deleteCandidate(999)).rejects.toThrow("Candidate not found");
    });

    it("should not return any data", async () => {
      mockDelete.mockResolvedValueOnce({ data: {} });

      const result = await deleteCandidate(1);

      expect(result).toBeUndefined();
    });
  });

  describe("searchCandidates", () => {
    it("should search candidates by query", async () => {
      const searchResults = [mockCandidate];
      mockGet.mockResolvedValueOnce({ data: searchResults });

      const result = await searchCandidates("John");

      expect(mockGet).toHaveBeenCalledWith("/candidates", {
        params: { q: "John" },
      });
      expect(result).toEqual(searchResults);
    });

    it("should return empty array when no matches found", async () => {
      mockGet.mockResolvedValueOnce({ data: [] });

      const result = await searchCandidates("NonExistent");

      expect(result).toEqual([]);
    });

    it("should handle search errors", async () => {
      const error = new Error("Search failed");
      mockGet.mockRejectedValueOnce(error);

      await expect(searchCandidates("test")).rejects.toThrow("Search failed");
    });

    it("should search with empty string", async () => {
      mockGet.mockResolvedValueOnce({ data: mockCandidates });

      const result = await searchCandidates("");

      expect(mockGet).toHaveBeenCalledWith("/candidates", {
        params: { q: "" },
      });
      expect(result).toEqual(mockCandidates);
    });

    it("should handle special characters in search query", async () => {
      mockGet.mockResolvedValueOnce({ data: [] });

      await searchCandidates("test@example.com");

      expect(mockGet).toHaveBeenCalledWith("/candidates", {
        params: { q: "test@example.com" },
      });
    });
  });

  describe("fetchCandidatesByStatus", () => {
    it("should fetch candidates by status", async () => {
      const pendingCandidates = [mockCandidate];
      mockGet.mockResolvedValueOnce({ data: pendingCandidates });

      const result = await fetchCandidatesByStatus("pending");

      expect(mockGet).toHaveBeenCalledWith("/candidates", {
        params: { status: "pending" },
      });
      expect(result).toEqual(pendingCandidates);
    });

    it("should return empty array when no candidates with status", async () => {
      mockGet.mockResolvedValueOnce({ data: [] });

      const result = await fetchCandidatesByStatus("rejected");

      expect(result).toEqual([]);
    });

    it("should handle different status values", async () => {
      const statuses = ["pending", "approved", "rejected", "on-hold"];

      for (const status of statuses) {
        mockGet.mockResolvedValueOnce({
          data: [{ ...mockCandidate, status }],
        });

        const result = await fetchCandidatesByStatus(status);

        expect(mockGet).toHaveBeenCalledWith("/candidates", {
          params: { status },
        });
        expect(result[0].status).toBe(status);
      }
    });

    it("should throw error when fetch by status fails", async () => {
      const error = new Error("Fetch failed");
      mockGet.mockRejectedValueOnce(error);

      await expect(fetchCandidatesByStatus("pending")).rejects.toThrow(
        "Fetch failed"
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      const networkError = new Error("Network Error");
      mockGet.mockRejectedValueOnce(networkError);

      await expect(fetchCandidates()).rejects.toThrow("Network Error");
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new Error("Request timeout");
      mockGet.mockRejectedValueOnce(timeoutError);

      await expect(fetchCandidates()).rejects.toThrow("Request timeout");
    });

    it("should handle server errors (500)", async () => {
      const serverError = new Error("Internal server error");
      mockGet.mockRejectedValueOnce(serverError);

      await expect(fetchCandidates()).rejects.toThrow("Internal server error");
    });
  });

  describe("Integration with Delay", () => {
    it("should work with delay in all API calls", async () => {
      setApiDelay(50);

      // Test multiple operations with delay
      mockGet.mockResolvedValue({ data: mockCandidates });
      mockPost.mockResolvedValue({ data: mockCandidate });
      mockPatch.mockResolvedValue({ data: mockCandidate });
      mockDelete.mockResolvedValue({ data: {} });

      const startTime = Date.now();

      await fetchCandidates();
      await createCandidate({ ...mockCandidate, id: undefined } as any);
      await updateCandidate(1, { status: "approved" });
      await deleteCandidate(1);

      const elapsed = Date.now() - startTime;

      // Should take at least 200ms (4 calls × 50ms delay)
      expect(elapsed).toBeGreaterThanOrEqual(200);
    });
  });
});
