import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Candidate } from "../../types/candidate";

// TODO: Update the import path once the CandidateTable component is moved to the correct location
// import { CandidateTable } from "../../Components/features/CandidateTable";
import { CandidateTable } from "../../Components/Training-Files/Phase-1/features/CandidateTable";

describe("CandidateTable Component", () => {
  const mockCandidates: Candidate[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0001",
      position: "Developer",
      status: "approved",
      skills: ["React", "TypeScript"],
      experience: 5,
      rating: 4.5,
      appliedDate: "2024-01-01",
      interviewDate: "2024-01-15",
      notes: "Great candidate",
      yearlySalary: 90000,
      location: "New York",
      education: "BS Computer Science",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-555-0002",
      position: "Designer",
      status: "pending",
      skills: ["Figma", "UI/UX"],
      experience: 3,
      rating: 4.0,
      appliedDate: "2024-01-02",
      interviewDate: null,
      notes: "Awaiting review",
      yearlySalary: 75000,
      location: "Boston",
      education: "BA Design",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnView = vi.fn();

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
    mockOnView.mockClear();
  });

  it("should render table headers", () => {
    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("should render candidate data", () => {
    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("should display empty state when no candidates", () => {
    render(
      <CandidateTable
        candidates={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    expect(screen.getByText("No candidates found.")).toBeInTheDocument();
  });

  it("should call onView when View button clicked", () => {
    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const viewButtons = screen.getAllByText("View");
    fireEvent.click(viewButtons[0]);

    expect(mockOnView).toHaveBeenCalledWith(1);
  });

  it("should call onEdit when Edit button clicked", () => {
    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockCandidates[0]);
  });

  it("should show confirm dialog before delete", () => {
    window.confirm = vi.fn(() => true);

    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
  });

  it("should call onDelete when delete confirmed", () => {
    window.confirm = vi.fn(() => true);

    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("should not call onDelete when delete cancelled", () => {
    window.confirm = vi.fn(() => false);

    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it("should apply correct status badge class", () => {
    render(
      <CandidateTable
        candidates={mockCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    const approvedBadge = screen.getByText("approved");
    const pendingBadge = screen.getByText("pending");

    expect(approvedBadge).toHaveClass("status-approved");
    expect(pendingBadge).toHaveClass("status-pending");
  });

  it("should paginate candidates with page size of 5", () => {
    const manyCandidates = Array.from({ length: 12 }, (_, i) => ({
      ...mockCandidates[0],
      id: i + 1,
      name: `Candidate ${i + 1}`,
    }));

    render(
      <CandidateTable
        candidates={manyCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    // Should only show 5 candidates on first page
    expect(screen.getByText("Candidate 1")).toBeInTheDocument();
    expect(screen.getByText("Candidate 5")).toBeInTheDocument();
    expect(screen.queryByText("Candidate 6")).not.toBeInTheDocument();
  });

  it("should render pagination controls for multiple pages", () => {
    const manyCandidates = Array.from({ length: 12 }, (_, i) => ({
      ...mockCandidates[0],
      id: i + 1,
      name: `Candidate ${i + 1}`,
    }));

    render(
      <CandidateTable
        candidates={manyCandidates}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
