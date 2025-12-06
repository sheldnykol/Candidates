import React, { type FormEvent } from "react";
import type { Candidate } from "../../../../types/candidate";
import { useForm } from "../../../../hooks/useForm";

interface CandidateFormProps {
  initialData?: Candidate;
  onSubmit: (data: Omit<Candidate, "id">) => void;
  onCancel: () => void;
}

export const CandidateForm: React.FC<CandidateFormProps> = ({
  initialData,
  onSubmit,
  // TODO  : Uncomment after implementing cancel functionality
  // onCancel,
}) => {
  const defaultValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    position: initialData?.position || "",
    status: initialData?.status || "pending",
    skills: initialData?.skills?.join(", ") || "",
    experience: initialData?.experience || 0,
    rating: initialData?.rating || 0,
    appliedDate:
      initialData?.appliedDate || new Date().toISOString().split("T")[0],
    interviewDate: initialData?.interviewDate || "",
    notes: initialData?.notes || "",
    yearlySalary: initialData?.yearlySalary || 0,
    location: initialData?.location || "",
    education: initialData?.education || "",
  };

  const {
    values,
    // TODO : Uncomment after implementing error handling
    // errors, handleChange, handleReset,
    setFieldError,
  } = useForm(defaultValues);

  // eslint-disable-next-line max-statements
  const validateForm = (): boolean => {
    let isValid = true;

    if (!values.name.trim()) {
      setFieldError("name", "Name is required");
      isValid = false;
    }

    // TODO: remove the eslint disable comment after implementing the form
    // eslint-disable-next-line sonarjs/slow-regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      setFieldError("email", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(values.email)) {
      setFieldError("email", "Invalid email format");
      isValid = false;
    }

    if (!values.position.trim()) {
      setFieldError("position", "Position is required");
      isValid = false;
    }

    if (Number(values.experience) < 0) {
      setFieldError("experience", "Experience cannot be negative");
      isValid = false;
    }

    if (Number(values.yearlySalary) < 0) {
      setFieldError("yearlySalary", "Salary cannot be negative");
      isValid = false;
    }

    // eslint-disable-next-line no-magic-numbers
    if (Number(values.rating) < 0 || Number(values.rating) > 5) {
      setFieldError("rating", "Rating must be between 0 and 5");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formData: Omit<Candidate, "id"> = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        position: values.position,
        status: values.status as Candidate["status"],
        skills: values.skills
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s),
        experience: Number(values.experience),
        rating: Number(values.rating),
        appliedDate: values.appliedDate,
        interviewDate: values.interviewDate || null,
        notes: values.notes,
        yearlySalary: Number(values.yearlySalary),
        location: values.location,
        education: values.education,
      };

      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="candidate-form">
      <div className="form-row">
        {/* TODO 1: Create Name input field */}
        {/* HINT: Use input type="text", name="name", required */}
        {/* Include label, value from values.name, onChange handler */}
        {/* Show error message if errors.name exists */}
        <div className="form-group">{/* Your name field here */}</div>

        {/* TODO 2: Create Email input field */}
        {/* HINT: Similar to name field, type="email" */}
        <div className="form-group">{/* Your email field here */}</div>
      </div>

      <div className="form-row">
        {/* TODO 3: Create Phone input field */}
        {/* HINT: type="tel", not required */}
        <div className="form-group">{/* Your phone field here */}</div>

        {/* TODO 4: Create Position input field */}
        {/* HINT: type="text", required */}
        <div className="form-group">{/* Your position field here */}</div>
      </div>

      <div className="form-row">
        {/* TODO 5: Create Status select field */}
        {/* HINT: Use select with options: pending, approved, rejected, on-hold */}
        <div className="form-group">{/* Your status field here */}</div>

        {/* TODO 6: Create Location input field */}
        {/* HINT: type="text" */}
        <div className="form-group">{/* Your location field here */}</div>
      </div>

      <div className="form-row">
        {/* TODO 7: Create Experience input field */}
        {/* HINT: type="number", min="0" */}
        <div className="form-group">{/* Your experience field here */}</div>

        {/* TODO 8: Create Yearly Salary input field */}
        {/* HINT: type="number", min="0", step="1000" */}
        <div className="form-group">{/* Your yearlySalary field here */}</div>
      </div>

      <div className="form-row">
        {/* TODO 9: Create Rating input field */}
        {/* HINT: type="number", min="0", max="5", step="0.1" */}
        <div className="form-group">{/* Your rating field here */}</div>

        {/* TODO 10: Create Education input field */}
        {/* HINT: type="text" */}
        <div className="form-group">{/* Your education field here */}</div>
      </div>

      {/* TODO 11: Create Skills input field (full width) */}
      {/* HINT: type="text", placeholder with comma-separated example */}
      <div className="form-group">{/* Your skills field here */}</div>

      <div className="form-row">
        {/* TODO 12: Create Applied Date input field */}
        {/* HINT: type="date", required */}
        <div className="form-group">{/* Your appliedDate field here */}</div>

        {/* TODO 13: Create Interview Date input field */}
        {/* HINT: type="date", not required */}
        <div className="form-group">{/* Your interviewDate field here */}</div>
      </div>

      {/* TODO 14: Create Notes textarea field */}
      {/* HINT: Use textarea with rows="4" */}
      <div className="form-group">{/* Your notes field here */}</div>

      {/* TODO 15: Create action buttons */}
      {/* HINT: Three buttons: Submit (type="submit"), Reset (type="button"), Cancel (type="button") */}
      {/* Submit should be btn-primary, Reset btn-secondary, Cancel btn-danger */}
      <div className="form-actions">{/* Your buttons here */}</div>
    </form>
  );
};
