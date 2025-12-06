import { describe, it, expect } from "vitest";
import { MOCK_CANDIDATES } from "../../utils/mockData";

describe("Mock Data", () => {
  it("should have 15 candidates", () => {
    expect(MOCK_CANDIDATES).toHaveLength(15);
  });

  it("should have valid candidate structure", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate).toHaveProperty("id");
      expect(candidate).toHaveProperty("name");
      expect(candidate).toHaveProperty("email");
      expect(candidate).toHaveProperty("phone");
      expect(candidate).toHaveProperty("position");
      expect(candidate).toHaveProperty("status");
      expect(candidate).toHaveProperty("skills");
      expect(candidate).toHaveProperty("experience");
      expect(candidate).toHaveProperty("rating");
      expect(candidate).toHaveProperty("appliedDate");
      expect(candidate).toHaveProperty("yearlySalary");
      expect(candidate).toHaveProperty("location");
      expect(candidate).toHaveProperty("education");
    });
  });

  it("should have unique IDs", () => {
    const ids = MOCK_CANDIDATES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("should have valid status values", () => {
    const validStatuses = ["approved", "pending", "rejected", "on-hold"];
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(validStatuses).toContain(candidate.status);
    });
  });

  it("should have non-empty names", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate.name.trim().length).toBeGreaterThan(0);
    });
  });

  it("should have valid email format", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(emailRegex.test(candidate.email)).toBe(true);
    });
  });

  it("should have non-negative experience", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate.experience).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have rating between 0 and 5", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate.rating).toBeGreaterThanOrEqual(0);
      expect(candidate.rating).toBeLessThanOrEqual(5);
    });
  });

  it("should have positive yearly salary", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate.yearlySalary).toBeGreaterThan(0);
    });
  });

  it("should have at least one skill", () => {
    MOCK_CANDIDATES.forEach((candidate) => {
      expect(candidate.skills.length).toBeGreaterThan(0);
    });
  });

  it("should have different candidates", () => {
    const names = MOCK_CANDIDATES.map((c) => c.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });
});
