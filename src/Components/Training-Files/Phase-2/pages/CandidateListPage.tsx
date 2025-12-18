import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { CandidateTable } from "../../Phase-1/features/CandidateTable";
import type { Candidate } from "../../../../types/candidate";

export const CandidateListPage: React.FC = () => {
  // TODO 1: Get candidates and deleteCandidate from useCandidate hook
  // HINT: const { candidates, deleteCandidate } = useCandidate();
  // Your code here
  const { candidates, deleteCandidate } = useCandidate();
  ///console.log(candidates);
  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here
  const navigate = useNavigate();

  // TODO 3: Initialize state for searchTerm
  // HINT: useState with empty string ""
  // Your code here
  const [searchTerm, setSearchTerm] = useState("");

  // TODO 4: Initialize state for filterStatus
  // HINT: useState with "all" as default
  // Your code here
  const [filterStatus, setFilterStatus] = useState("all");
  // TODO 5: Create filteredCandidates using useMemo
  // HINT: Dependencies are [candidates, filterStatus, searchTerm]
  // Logic:
  // 1. Start with all candidates
  // 2. If filterStatus !== "all", filter by status
  // 3. If searchTerm is not empty, filter by name, email, or position (case-insensitive)
  const filteredCandidates = useMemo(() => {
    // Your filtering logic here
    let resultCandidates = candidates;

    if (filterStatus !== "all") {
      resultCandidates = resultCandidates.filter(
        (rc) => rc.status === filterStatus
      );
    }
    ///console.log(" FILTERED CANDIDATES ", resultCandidates);

    if (searchTerm.trim()) {
      resultCandidates = resultCandidates.filter(
        (rs) =>
          rs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rs.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rs.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    ///console.log(" FILTERED CANDIDATES ", resultCandidates);
    return resultCandidates; // Replace with actual filtered result
  }, [candidates, filterStatus, searchTerm]);

  // TODO 6: Create handleSearchChange function
  // HINT: Takes React.ChangeEvent<HTMLInputElement>
  // Updates searchTerm state with e.target.value
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // TODO 7: Create handleFilterChange function
  // HINT: Takes React.ChangeEvent<HTMLSelectElement>
  // Updates filterStatus state with e.target.value
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  // TODO 8: Create handleEdit function
  // HINT: Takes Candidate object
  // Navigate to `/candidates/${candidate.id}/edit`
  const handleEdit = (candidate: Candidate) => {
    navigate(`candidates/${candidate.id}/edit`);
  };

  // TODO 9: Create handleDelete function
  // HINT: Takes id number
  // Call deleteCandidate(id)
  const handleDelete = (id: number) => {
    // if (window.confirm("Are you sure you want to delete this candidate ?"))
    deleteCandidate(id);
  };

  // TODO 10: Create handleView function
  // HINT: Takes id number
  // Navigate to `/candidates/${id}`
  const handleView = (id: number) => {
    navigate(`/candidates/${id}`);
  };

  return (
    <div>
      {/* TODO 11: Create list header */}
      {/* HINT: Use div with className="list-header" */}
      {/* Include h1 with page title and count, button to add new candidate */}
      <div className="list-header">
        {/* TODO 12: Add page title with count */}
        {/* Structure:
            <h1 className="page-title">
              Candidates
              <span className="text-muted font-30">{` (${filteredCandidates.length})`}</span>
            </h1>
        */}
        {/* Your title here */}
        <h1 className="page-title">
          Candidates
          <span className="text-muted font-30">{` (${filteredCandidates.length})`}</span>
        </h1>

        {/* TODO 13: Add "Add Candidate" button */}
        {/* HINT: onClick navigate to "/add", className="btn btn-success" */}
        {/* Your button here */}
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          Add Candidate
        </button>
      </div>

      {/* TODO 14: Create filters section */}
      {/* HINT: Use div with className="list-filters" */}
      <div className="list-filters">
        {/* TODO 15: Add search input */}
        {/* HINT: 
            - type="text"
            - placeholder="Search by name, email, or position..."
            - value={searchTerm}
            - onChange={handleSearchChange}
            - className="search-input"
        */}
        {/* Your search input here */}
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/* TODO 16: Add status filter select */}
        {/* HINT:
            - value={filterStatus}
            - onChange={handleFilterChange}
            - className="select-input"
            - Options: All Statuses, Pending, Approved, Rejected, On Hold
            - Values: all, pending, approved, rejected, on-hold
        */}
        {/* Your select here */}
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="select-input"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>

      {/* TODO 17: Add CandidateTable component */}
      {/* HINT: Pass props: candidates={filteredCandidates}, onEdit, onDelete, onView */}
      {/* Your CandidateTable here */}
      <CandidateTable
        candidates={filteredCandidates}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};
