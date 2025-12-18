import React from "react";
import { useCandidate } from "../../../../hooks/useCandidate";

export const DashboardPage: React.FC = () => {
  // TODO 1: Get candidates from useCandidate hook
  // HINT: const { candidates } = useCandidate();
  // Your code here
  const { candidates } = useCandidate();

  // TODO 2: Calculate total candidates
  // HINT: Use candidates.length
  // Your code here

  const totalCandidates = candidates.length;

  // TODO 3: Calculate status counts
  // HINT: Use filter() to count candidates by status
  // Count: approved, pending, rejected, on-hold
  // Your code here
  const approvedCount = candidates.filter(
    (c) => c.status === "approved"
  ).length;
  const pendingCount = candidates.filter((c) => c.status === "pending").length;
  const rejectedCount = candidates.filter(
    (c) => c.status === "rejected"
  ).length;
  const onHoldCount = candidates.filter((c) => c.status === "on-hold").length;

  // TODO 4: Calculate average salary
  // HINT: Use reduce() to sum yearlySalary, then divide by length
  // Use Math.round() for whole number
  // Return 0 if no candidates
  // Your code here
  const avgSalary =
    totalCandidates >= 1
      ? Math.round(
          candidates.reduce((s, c) => s + c.yearlySalary, 0) / totalCandidates
        )
      : 0;

  // TODO 5: Calculate average experience
  // HINT: Similar to salary, use reduce() and divide
  // Use .toFixed(1) for one decimal place
  // Return 0 if no candidates
  // Your code here
  const avgExperience =
    totalCandidates >= 1
      ? (
          candidates.reduce((s, c) => s + c.experience, 0) / candidates.length
        ).toFixed(1)
      : 0;

  return (
    <div>
      <h1 className="dashboard-header">Dashboard</h1>

      {/* TODO 6: Create dashboard stats grid */}
      {/* HINT: Use div with className="dashboard-stats-grid" */}
      {/* Create stat cards for:
          1. Total Candidates (stat-value-primary)
          2. Approved (stat-value-success)
          3. Pending (stat-value-warning)
          4. On Hold (stat-value-secondary)
          5. Rejected (stat-value-danger)
      */}

      <div className="dashboard-stats-grid">
        {/* TODO 7: Create stat card for Total Candidates */}
        {/* Structure:
            <div className="stat-card">
              <div className="stat-title">Total Candidates</div>
              <div className="stat-value stat-value-primary">{totalCandidates}</div>
            </div>
        */}
        {/* Your stat cards here */}
        <div className="stat-card">
          <div className="stat-title">Total Candidates</div>
          <div className="stat-value stat-value-primary">{totalCandidates}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Approved Candidates</div>
          <div className="stat-value stat-value-primary">{approvedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending Candidates</div>
          <div className="stat-value stat-value-primary">{pendingCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">On Hold Candidates</div>
          <div className="stat-value stat-value-primary">{onHoldCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Rejected Candidates</div>
          <div className="stat-value stat-value-primary">{rejectedCount}</div>
        </div>
      </div>

      {/* TODO 8: Create dashboard details grid */}
      {/* HINT: Use div with className="dashboard-details-grid" */}
      {/* Create stat cards for:
          1. Average Salary (with "per year" subtitle)
          2. Average Experience (with "across all candidates" subtitle)
      */}
      <div className="dashboard-details-grid">
        {/* TODO 9: Create stat card for Average Salary */}
        {/* Structure:
            <div className="stat-card">
              <div className="stat-title">Average Salary</div>
              <div className="stat-value">${avgSalary.toLocaleString()}</div>
              <div className="stat-subtitle">per year</div>
            </div>
        */}
        {/* Your detail cards here */}
        <div className="stat-card">
          <div className="stat-title">Average Salary</div>
          <div className="stat-value">${avgSalary.toLocaleString()}</div>
          <div className="stat-subtitle">per year</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Experience</div>
          <div className="stat-value">{avgExperience.toLocaleString()}</div>
          <div className="stat-subtitle">years</div>
        </div>
      </div>
    </div>
  );
};
