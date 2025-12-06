import React from "react";
import type { Candidate } from "../../../../types/candidate";

interface CandidateTableProps {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

/**
 *
 * TODO: Uncomment and complete the implementation 
  const PAGE_SIZE = 5;
 */

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,

  // TODO  : Uncomment after implementing the handlers
  // onEdit,
  // onDelete,
  // onView,
}) => {
  // TODO: Remove this console log after completing the implementation
  console.log("CandidateTable candidates:", candidates);

  // TODO 1: Initialize currentPage state with useState
  // HINT: Start with page 1
  // Your code here

  // TODO 2: Calculate totalPages
  // HINT: Use Math.ceil(candidates.length / PAGE_SIZE)
  // Your code here

  // TODO 3: Calculate pagination values
  // HINT: startIndex = (currentPage - 1) * PAGE_SIZE
  // HINT: paginatedCandidates = candidates.slice(startIndex, startIndex + PAGE_SIZE)
  // Your code here

  // TODO 4: Create handlePageChange function
  // HINT: Takes page number and updates currentPage state
  // const handlePageChange = (page: number) => {
  //   // Your code here
  // };

  // TODO 5: Create getStatusClass function
  // HINT: Return CSS class based on status
  // approved -> "status-approved"
  // pending -> "status-pending"
  // rejected -> "status-rejected"
  // on-hold -> "status-on-hold"
  // default -> ""
  // const getStatusClass = (status: string) => {
  //   // Your code here
  // };

  // TODO 6: Add empty state check
  // HINT: If candidates.length === 0, return a div with "No candidates found."
  // Use className="empty-state"
  // Your code here

  return (
    <>
      <div className="table-container">
        {/* TODO 7: Create table structure */}
        {/* HINT: table with className="candidate-table" */}
        {/* <table className="candidate-table"> */}
        <thead>
          {/* TODO 8: Create table headers */}
          {/* HINT: Headers should be: Name, Email, Position, Status, Experience, Salary, Actions */}
          {/* <tr>Your headers here</tr> */}
        </thead>
        <tbody>
          {/* TODO 9: Map through paginatedCandidates */}
          {/* HINT: Use candidate.id as key */}
          {/* Display: name, email, position, status (with badge), experience (years), yearlySalary (formatted) */}
          {/* Your rows here */}
        </tbody>
        {/* </table> */}
      </div>

      {/* TODO 10: Add Pagination component */}
      {/* HINT: Pass currentPage, totalPages, and onPageChange props */}
      {/* Your Pagination component here */}
    </>
  );
};
