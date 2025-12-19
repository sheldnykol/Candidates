import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../../../hooks/useCandidate";
import { CandidateTable } from "../../Phase-1/features/CandidateTable";
import type { Candidate } from "../../../../types/candidate";

export const CandidateListPage: React.FC = () => {
  const { candidates, deleteCandidate } = useCandidate();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCandidates = useMemo(() => {
    // Your filtering logic here
    let resultCandidates = candidates;

    if (filterStatus !== "all") {
      resultCandidates = resultCandidates.filter(
        (rc) => rc.status === filterStatus
      );
    }

    if (searchTerm.trim()) {
      resultCandidates = resultCandidates.filter(
        (rs) =>
          rs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rs.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rs.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return resultCandidates;
  }, [candidates, filterStatus, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleEdit = (candidate: Candidate) => {
    navigate(`/candidates/${candidate.id}/edit`);
  };

  const handleDelete = (id: number | string) => {
    deleteCandidate(Number(id));
  };

  const handleView = (id: number | string) => {
    navigate(`/candidates/${id}`);
  };

  return (
    <div>
      <div className="list-header">
        <h1 className="page-title">
          Candidates
          <span className="text-muted font-30">{` (${filteredCandidates.length})`}</span>
        </h1>

        <button className="btn btn-success" onClick={() => navigate("/add")}>
          Add Candidate
        </button>
      </div>

      <div className="list-filters">
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

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

      <CandidateTable
        candidates={filteredCandidates}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};
