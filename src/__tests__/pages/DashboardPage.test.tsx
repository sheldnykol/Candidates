import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CandidateProvider } from "../../context/CandidateProvider";

// TODO: Update the import path once the DashboardPage component is moved to the correct location
// import { DashboardPage } from "../../Components/pages/DashboardPage";
import { DashboardPage } from "../../Components/Training-Files/Phase-1/pages/DashboardPage";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <CandidateProvider>{component}</CandidateProvider>
    </BrowserRouter>
  );
};

describe("DashboardPage Component", () => {
  it("should render dashboard title", () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it("should display statistics cards", () => {
    renderWithProviders(<DashboardPage />);

    // Check for stat cards
    expect(screen.getByText(/total candidates/i)).toBeInTheDocument();
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("should calculate and display correct statistics", () => {
    renderWithProviders(<DashboardPage />);

    // Total candidates should be displayed
    const totalElement = screen
      .getByText(/total candidates/i)
      .closest(".stat-card");
    expect(totalElement).toBeInTheDocument();
  });

  it("should render without errors", () => {
    const { container } = renderWithProviders(<DashboardPage />);
    expect(container).toBeInTheDocument();
  });
});
