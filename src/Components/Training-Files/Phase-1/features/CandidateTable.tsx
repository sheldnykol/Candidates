import React from "react";
import type { Candidate } from "../../../../types/candidate";
import { Pagination } from "../../../common/Pagination";

interface CandidateTableProps {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: number | string) => void;
  onView: (id: number | string) => void;
}

const PAGE_SIZE = 5;
export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,

  onEdit,
  onDelete,
  onView,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(candidates.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCandidates = candidates.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    // Your code here
    setCurrentPage(page);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "rejected":
        return "status-rejected";
      case "on-hold":
        return "status-on-hold";
      default:
        return "";
    }
  };

  if (candidates.length === 0) {
    return <div className="empty-state"> No candidates found.</div>;
  }

  return (
    <>
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr style={{ textAlignLast: "center" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.position}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusClass(
                      candidate.status
                    )}`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td>{candidate.experience}</td>
                <td>{candidate.yearlySalary}</td>
                <td>
                  <button
                    className="btn btn-small btn-primary"
                    onClick={() => onView(candidate.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-small btn-success"
                    onClick={() => onEdit(candidate)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => {
                      if (
                        // eslint-disable-next-line no-alert
                        window.confirm(
                          "Are you sure you want to delete this candidate ?"
                        )
                      )
                        onDelete(candidate.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
