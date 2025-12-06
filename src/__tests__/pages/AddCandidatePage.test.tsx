import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CandidateProvider } from "../../context/CandidateProvider";

// TODO: Update the import path once the AddCandidatePage component is moved to the correct location
// import { AddCandidatePage } from "../../Components/pages/AddCandidatePage";
import { AddCandidatePage } from "../../Components/Training-Files/Phase-2/pages/AddCandidatePage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AddCandidatePage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CandidateProvider>
          <AddCandidatePage />
        </CandidateProvider>
      </BrowserRouter>
    );
  };

  it("should render page header", () => {
    renderComponent();

    expect(screen.getByText("Add New Candidate")).toBeInTheDocument();
  });

  it("should render candidate form", () => {
    renderComponent();

    // Check for form elements
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(
      document.querySelector('input[name="position"]')
    ).toBeInTheDocument();
  });

  it("should render submit button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should render cancel button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should have form wrapper class", () => {
    renderComponent();

    expect(document.querySelector(".form-wrapper")).toBeInTheDocument();
  });

  it("should have page header class", () => {
    renderComponent();

    expect(document.querySelector(".page-header")).toBeInTheDocument();
  });
});
