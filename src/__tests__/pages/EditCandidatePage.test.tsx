import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CandidateProvider } from "../../context/CandidateProvider";

// TODO: Update the import path once the EditCandidatePage component is moved to the correct location
// import { EditCandidatePage } from "../../Components/pages/EditCandidatePage";
import { EditCandidatePage } from "../../Components/Training-Files/Phase-2/pages/EditCandidatePage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("EditCandidatePage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CandidateProvider>
          <Routes>
            <Route path="/" element={<EditCandidatePage />} />
          </Routes>
        </CandidateProvider>
      </BrowserRouter>
    );
  };

  it("should render not found message for invalid candidate id", () => {
    // Mock useParams to return invalid id
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
      screen.getByText(/the candidate you're trying to edit doesn't exist/i)
    ).toBeInTheDocument();
  });

  it("should render back to candidates button for invalid id", () => {
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

  it("should navigate to candidates list when back button clicked", () => {
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

  it("should have correct error page CSS classes", () => {
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
