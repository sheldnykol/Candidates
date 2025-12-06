import React from "react";

export const CandidateListPage: React.FC = () => {
  // TODO 1: Get candidates and deleteCandidate from useCandidate hook
  // HINT: const { candidates, deleteCandidate } = useCandidate();
  // Your code here

  // TODO 2: Get navigate function from useNavigate
  // HINT: const navigate = useNavigate();
  // Your code here

  // TODO 3: Initialize state for searchTerm
  // HINT: useState with empty string ""
  // Your code here

  // TODO 4: Initialize state for filterStatus
  // HINT: useState with "all" as default
  // Your code here

  // TODO 5: Create filteredCandidates using useMemo
  // HINT: Dependencies are [candidates, filterStatus, searchTerm]
  // Logic:
  // 1. Start with all candidates
  // 2. If filterStatus !== "all", filter by status
  // 3. If searchTerm is not empty, filter by name, email, or position (case-insensitive)
  // const filteredCandidates = useMemo(() => {
  //   // Your filtering logic here
  //   return []; // Replace with actual filtered result
  // }, [candidates, filterStatus, searchTerm]);

  // TODO 6: Create handleSearchChange function
  // HINT: Takes React.ChangeEvent<HTMLInputElement>
  // Updates searchTerm state with e.target.value
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // Your code here
  // };

  // TODO 7: Create handleFilterChange function
  // HINT: Takes React.ChangeEvent<HTMLSelectElement>
  // Updates filterStatus state with e.target.value
  // const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // Your code here
  // };

  // TODO 8: Create handleEdit function
  // HINT: Takes Candidate object
  // Navigate to `/candidates/${candidate.id}/edit`
  // const handleEdit = (candidate: Candidate) => {
  //   // Your code here
  // };

  // TODO 9: Create handleDelete function
  // HINT: Takes id number
  // Call deleteCandidate(id)
  // const handleDelete = (id: number) => {
  //   // Your code here
  // };

  // TODO 10: Create handleView function
  // HINT: Takes id number
  // Navigate to `/candidates/${id}`
  // const handleView = (id: number) => {
  //   // Your code here
  // };

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

        {/* TODO 13: Add "Add Candidate" button */}
        {/* HINT: onClick navigate to "/add", className="btn btn-success" */}
        {/* Your button here */}
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

        {/* TODO 16: Add status filter select */}
        {/* HINT:
            - value={filterStatus}
            - onChange={handleFilterChange}
            - className="select-input"
            - Options: All Statuses, Pending, Approved, Rejected, On Hold
            - Values: all, pending, approved, rejected, on-hold
        */}
        {/* Your select here */}
      </div>

      {/* TODO 17: Add CandidateTable component */}
      {/* HINT: Pass props: candidates={filteredCandidates}, onEdit, onDelete, onView */}
      {/* Your CandidateTable here */}
    </div>
  );
};
