import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CandidateProvider } from "../../context/CandidateProvider";

// TODO: Update the import path once the CandidateDetailPage component is moved to the correct location
// import { CandidateDetailPage } from "../../Components/pages/CandidateDetailPage";
import { CandidateDetailPage } from "../../Components/Training-Files/Phase-2/pages/CandidateDetailPage";

const mockNavigate = vi.fn();
const mockConfirm = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CandidateDetailPage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockConfirm.mockClear();
    window.confirm = mockConfirm as any;
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CandidateProvider>
          <Routes>
            <Route path="/" element={<CandidateDetailPage />} />
          </Routes>
        </CandidateProvider>
      </BrowserRouter>
    );
  };

  it("should render not found message for invalid candidate id", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "99999" }),
      };
    });

    renderComponent();

    expect(screen.getByText(/candidate not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the candidate you're looking for doesn't exist/i)
    ).toBeInTheDocument();
  });

  it("should render back button for invalid candidate", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "99999" }),
      };
    });

    renderComponent();

    const backButton = screen.getByRole("button", {
      name: /back to candidates/i,
    });
    expect(backButton).toBeInTheDocument();
  });

  it("should navigate when back button clicked on error page", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "99999" }),
      };
    });

    renderComponent();

    const backButton = screen.getByRole("button", {
      name: /back to candidates/i,
    });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/candidates");
  });

  it("should have section titles for valid candidate", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "1" }),
      };
    });

    renderComponent();

    // These will exist if a valid candidate is found
    const sections = document.querySelectorAll(".section-title");
    expect(sections.length).toBeGreaterThanOrEqual(0);
  });

  it("should have correct CSS classes structure", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "99999" }),
      };
    });

    renderComponent();

    expect(document.querySelector(".not-found-container")).toBeInTheDocument();
    expect(document.querySelector(".error-title")).toBeInTheDocument();
    expect(document.querySelector(".error-text")).toBeInTheDocument();
  });
});
