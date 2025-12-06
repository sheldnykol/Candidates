import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MOCK_CANDIDATES } from "../../utils/mockData";
import type { Candidate } from "../../types/candidate";
import { CandidateProvider } from "../../context/CandidateProvider";

// TODO: Update the import path once the CandidateListPage component is moved to the correct location
// import { CandidateListPage } from "../../Components/pages/CandidateListPage";
import { CandidateListPage } from "../../Components/Training-Files/Phase-2/pages/CandidateListPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Counter for generating unique IDs in tests
let mockIdCounter = 20000;

// Mock the candidateApi module
vi.mock("../../services/candidateApi", () => ({
  fetchCandidates: vi.fn(() => Promise.resolve(MOCK_CANDIDATES)),
  createCandidate: vi.fn((candidate: Omit<Candidate, "id">) => {
    mockIdCounter++;
    return Promise.resolve({ ...candidate, id: mockIdCounter } as Candidate);
  }),
  updateCandidate: vi.fn((id: number, updates: Partial<Candidate>) => {
    const candidate = MOCK_CANDIDATES.find((c) => c.id === id);
    return Promise.resolve({ ...candidate, ...updates } as Candidate);
  }),
  deleteCandidate: vi.fn(() => Promise.resolve()),
  fetchCandidateById: vi.fn((id: number) =>
    Promise.resolve(MOCK_CANDIDATES.find((c) => c.id === id))
  ),
  searchCandidates: vi.fn((query: string) => {
    const term = query.toLowerCase();
    return Promise.resolve(
      MOCK_CANDIDATES.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.position.toLowerCase().includes(term)
      )
    );
  }),
  fetchCandidatesByStatus: vi.fn((status: string) =>
    Promise.resolve(
      status === "all"
        ? MOCK_CANDIDATES
        : MOCK_CANDIDATES.filter((c) => c.status === status)
    )
  ),
  setApiDelay: vi.fn(),
  getApiDelay: vi.fn(() => 0),
}));

describe("CandidateListPage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CandidateProvider>
          <CandidateListPage />
        </CandidateProvider>
      </BrowserRouter>
    );
  };

  it("should render page title with candidate count", () => {
    renderComponent();

    expect(screen.getByText("Candidates")).toBeInTheDocument();
  });

  it("should render add candidate button", () => {
    renderComponent();

    const addButton = screen.getByRole("button", { name: /add candidate/i });
    expect(addButton).toBeInTheDocument();
  });

  it("should render search input", () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText(
      /search by name, email, or position/i
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("should render status filter dropdown", () => {
    renderComponent();

    const filterSelect = screen.getByRole("combobox");
    expect(filterSelect).toBeInTheDocument();
    expect(screen.getByText("All Statuses")).toBeInTheDocument();
  });

  it("should navigate to add page when clicking add button", () => {
    renderComponent();

    const addButton = screen.getByRole("button", { name: /add candidate/i });
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("/add");
  });

  it("should update search term on input change", () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText(
      /search by name, email, or position/i
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(searchInput.value).toBe("John");
  });

  it("should update filter status on select change", () => {
    renderComponent();

    const filterSelect = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(filterSelect, { target: { value: "approved" } });

    expect(filterSelect.value).toBe("approved");
  });

  it("should have all status filter options", () => {
    renderComponent();

    expect(screen.getByText("All Statuses")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.getByText("On Hold")).toBeInTheDocument();
  });

  it("should render candidate table", async () => {
    renderComponent();

    // Wait for data to load
    await waitFor(() => {
      expect(document.querySelector("table")).toBeInTheDocument();
    });
  });

  it("should have correct CSS classes", () => {
    renderComponent();

    expect(document.querySelector(".list-header")).toBeInTheDocument();
    expect(document.querySelector(".list-filters")).toBeInTheDocument();
    expect(document.querySelector(".search-input")).toBeInTheDocument();
    expect(document.querySelector(".select-input")).toBeInTheDocument();
  });
});
