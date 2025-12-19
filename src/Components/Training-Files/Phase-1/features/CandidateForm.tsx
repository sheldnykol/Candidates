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
  onCancel,
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

  const { values, errors, handleChange, handleReset, setFieldError } =
    useForm(defaultValues);

  // eslint-disable-next-line max-statements
  const validateForm = (): boolean => {
    let isValid = true;

    if (!values.name.trim()) {
      setFieldError("name", "Name is required");
      isValid = false;
    }

    // TODO: remove the eslint disable comment after implementing the form
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
    <div className="form-container">
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-grid">
          {/* TODO 1: Create Name input field */}
          {/* HINT: Use input type="text", name="name", required */}
          {/* Include label, value from values.name, onChange handler */}
          {/* Show error message if errors.name exists */}
          <div className="form-group">
            {/* Your name field here */}
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          {/* TODO 2: Create Email input field */}
          {/* HINT: Similar to name field, type="email" */}
          <div className="form-group">
            {/* Your email field here */}
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
        </div>

        <div className="form-grid">
          {/* TODO 3: Create Phone input field */}
          {/* HINT: type="tel", not required */}
          <div className="form-group">
            {/* Your phone field here */}
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* TODO 4: Create Position input field */}
          {/* HINT: type="text", required */}
          <div className="form-group">
            {/* Your position field here */}
            <label className="form-label">Position *</label>
            <input
              type="text"
              name="position"
              value={values.position}
              onChange={handleChange}
              required
              placeholder="position is required"
              className="form-input"
            />
            {errors.position && <p className="form-error">{errors.position}</p>}
          </div>
        </div>

        <div className="form-grid">
          {/* TODO 5: Create Status select field */}
          {/* HINT: Use select with options: pending, approved, rejected, on-hold */}
          <div className="form-group">
            {/* Your status field here */}
            <label className="form-label">Status</label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          {/* TODO 6: Create Location input field */}
          {/* HINT: type="text" */}
          <div className="form-group">
            {/* Your location field here */}
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-grid">
          {/* TODO 7: Create Experience input field */}
          {/* HINT: type="number", min="0" */}
          <div className="form-group">
            {/* Your experience field here */}
            <label className="form-label">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={values.experience}
              onChange={handleChange}
              min="0"
              className="form-input"
            />
            {errors.experience && (
              <p className="form-error">{errors.experience}</p>
            )}
          </div>

          {/* TODO 8: Create Yearly Salary input field */}
          {/* HINT: type="number", min="0", step="1000" */}
          <div className="form-group">
            {/* Your yearlySalary field here */}
            <label className="form-label">Yearly Salary</label>
            <input
              type="number"
              name="yearlySalary"
              value={values.yearlySalary}
              onChange={handleChange}
              min="0"
              step="1000"
              className="form-input"
            />
            {errors.yearlySalary && (
              <p className="form-error">{errors.yearlySalary}</p>
            )}
          </div>
        </div>

        <div className="form-grid">
          {/* TODO 9: Create Rating input field */}
          {/* HINT: type="number", min="0", max="5", step="0.1" */}
          <div className="form-group">
            {/* Your rating field here */}
            <label className="form-label">Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              value={values.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="form-input"
            />
            {errors.rating && <p className="form-error">{errors.rating}</p>}
          </div>

          {/* TODO 10: Create Education input field */}
          {/* HINT: type="text" */}
          <div className="form-group">
            {/* Your education field here */}
            <label className="form-label">Education</label>
            <input
              type="text"
              name="education"
              value={values.education}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* TODO 11: Create Skills input field (full width) */}
        {/* HINT: type="text", placeholder with comma-separated example */}
        <div className="form-group">
          {/* Your skills field here */}
          <label className="form-label">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={values.skills}
            onChange={handleChange}
            placeholder="e.g., React, TypeScript, Node.js"
            className="form-input"
          />
        </div>

        <div className="form-row">
          {/* TODO 12: Create Applied Date input field */}
          {/* HINT: type="date", required */}
          <div className="form-group">
            {/* Your appliedDate field here */}
            <label className="form-label">Applied Date *</label>
            <input
              type="date"
              name="appliedDate"
              value={values.appliedDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* TODO 13: Create Interview Date input field */}
          {/* HINT: type="date", not required */}
          <div className="form-group">
            {/* Your interviewDate field here */}
            <label className="form-label">Interview Date</label>
            <input
              type="date"
              name="interviewDate"
              value={values.interviewDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* TODO 14: Create Notes textarea field */}
        {/* HINT: Use textarea with rows="4" */}
        <div className="form-group form-group-full">
          {/* Your notes field here */}
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
            rows={4}
            className="form-textarea"
          />
        </div>

        {/* TODO 15: Create action buttons */}
        {/* HINT: Three buttons: Submit (type="submit"), Reset (type="button"), Cancel (type="button") */}
        {/* Submit should be btn-primary, Reset btn-secondary, Cancel btn-danger */}
        <div className="form-actions">
          {/* Your buttons here */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
