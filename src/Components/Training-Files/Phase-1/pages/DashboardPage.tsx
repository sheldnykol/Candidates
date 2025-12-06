import React from "react";

export const DashboardPage: React.FC = () => {
  // TODO 1: Get candidates from useCandidate hook
  // HINT: const { candidates } = useCandidate();
  // Your code here

  // TODO 2: Calculate total candidates
  // HINT: Use candidates.length
  // Your code here

  // TODO 3: Calculate status counts
  // HINT: Use filter() to count candidates by status
  // Count: approved, pending, rejected, on-hold
  // Your code here

  // TODO 4: Calculate average salary
  // HINT: Use reduce() to sum yearlySalary, then divide by length
  // Use Math.round() for whole number
  // Return 0 if no candidates
  // Your code here

  // TODO 5: Calculate average experience
  // HINT: Similar to salary, use reduce() and divide
  // Use .toFixed(1) for one decimal place
  // Return 0 if no candidates
  // Your code here

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
      </div>
    </div>
  );
};
