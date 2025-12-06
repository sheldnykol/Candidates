import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { Candidate } from "../../types/candidate";

// TODO: Update the import path once the CandidateForm component is moved to the correct location
// import { CandidateForm } from "../../Components/features/CandidateForm";
import { CandidateForm } from "../../Components/Training-Files/Phase-1/features/CandidateForm";

describe("CandidateForm Component", () => {
  const mockSubmit = vi.fn();
  const mockCancel = vi.fn();

  const mockCandidate: Candidate = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    position: "Software Engineer",
    status: "approved",
    skills: ["React", "TypeScript"],
    experience: 5,
    rating: 4.5,
    appliedDate: "2024-01-15",
    interviewDate: "2024-02-01",
    notes: "Great candidate",
    yearlySalary: 100000,
    location: "New York",
    education: "Bachelor's in CS",
  };

  beforeEach(() => {
    mockSubmit.mockClear();
    mockCancel.mockClear();
  });

  it("should render all form fields", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="phone"]')).toBeInTheDocument();
    expect(
      document.querySelector('input[name="position"]')
    ).toBeInTheDocument();
    expect(document.querySelector('select[name="status"]')).toBeInTheDocument();
    expect(
      document.querySelector('input[name="location"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('input[name="experience"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('input[name="yearlySalary"]')
    ).toBeInTheDocument();
    expect(document.querySelector('input[name="rating"]')).toBeInTheDocument();
    expect(
      document.querySelector('input[name="education"]')
    ).toBeInTheDocument();
  });

  it("should render all action buttons", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should populate form with initial data", () => {
    render(
      <CandidateForm
        initialData={mockCandidate}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const positionInput = document.querySelector(
      'input[name="position"]'
    ) as HTMLInputElement;

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(positionInput.value).toBe("Software Engineer");
  });

  it("should show validation error for empty name", async () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it("should have email input with correct type", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should show validation error for empty position", async () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/position is required/i)).toBeInTheDocument();
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it("should reset form when reset button clicked", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(nameInput.value).toBe("");
  });

  it("should update input values on change", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });

    expect(nameInput.value).toBe("Jane Smith");
    expect(emailInput.value).toBe("jane@example.com");
  });

  it("should have all status options", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const statusSelect = document.querySelector('select[name="status"]');
    expect(statusSelect).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: /pending/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /approved/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /rejected/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /on hold/i })
    ).toBeInTheDocument();
  });

  it("should render skills input field", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const skillsInput = screen.getByPlaceholderText(
      /e.g., react, typescript, node.js/i
    );
    expect(skillsInput).toBeInTheDocument();
  });

  it("should render notes textarea", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const notesTextarea = document.querySelector('textarea[name="notes"]');
    expect(notesTextarea).toBeInTheDocument();
    expect(notesTextarea?.tagName).toBe("TEXTAREA");
  });

  it("should have correct form CSS classes", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    expect(document.querySelector(".form-container")).toBeInTheDocument();
    expect(document.querySelector(".form-grid")).toBeInTheDocument();
    expect(document.querySelector(".form-actions")).toBeInTheDocument();
  });

  it("should have number inputs with proper constraints", () => {
    render(<CandidateForm onSubmit={mockSubmit} onCancel={mockCancel} />);

    const ratingInput = document.querySelector(
      'input[name="rating"]'
    ) as HTMLInputElement;
    const experienceInput = document.querySelector(
      'input[name="experience"]'
    ) as HTMLInputElement;
    const salaryInput = document.querySelector(
      'input[name="yearlySalary"]'
    ) as HTMLInputElement;

    expect(ratingInput).toHaveAttribute("min", "0");
    expect(ratingInput).toHaveAttribute("max", "5");
    expect(ratingInput).toHaveAttribute("type", "number");

    expect(experienceInput).toHaveAttribute("min", "0");
    expect(experienceInput).toHaveAttribute("type", "number");

    expect(salaryInput).toHaveAttribute("min", "0");
    expect(salaryInput).toHaveAttribute("type", "number");
  });
});
