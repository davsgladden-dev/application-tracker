import { useState } from "react";
import type { NewApplication, ApplicationStatus } from "../types/application";
import { saveApplication } from "../api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddApplicationPage() {
  const [form, setForm] = useState<NewApplication>({
    businessName: "",
    url: "",
    applicationStatus: "Applied",
    note: "",
    dateApplied: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: saveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setForm({
        businessName: "",
        url: "",
        applicationStatus: "Applied",
        note: "",
        dateApplied: "",
      });
      setSuccess(true);
    },
  });

  function handleSubmit() {
    setSuccess(false);
    setValidationError(null);
    if (form.businessName === "") {
      setValidationError("Business name is required");
      return;
    }
    saveMutation.mutate(form);
  }

  return (
    <>
      <h2> AddApplication</h2>
      <br />
      <label>Business Name: </label>
      <input
        value={form.businessName}
        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
      />
      <br />
      <label>Application URL: </label>
      <input
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />
      <br />
      <label>Application Status: </label>
      <select
        value={form.applicationStatus}
        onChange={(e) =>
          setForm({
            ...form,
            applicationStatus: e.target.value as ApplicationStatus,
          })
        }
      >
        <option value="Applied">Applied</option>
        <option value="Rejected">Rejected</option>
        <option value="InterviewScheduled">Interview Scheduled</option>
        <option value="RejectedPostInterview">Rejected Post Interview</option>
        <option value="OfferReceived">Offer Received</option>
        <option value="OfferRejected">Offer Rejected</option>
        <option value="OfferAccepted">Offer Accepted</option>
        <option value="PositionClosed">Position Closed</option>
      </select>
      <br />
      <label>Note: </label>
      <input
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <br />
      <label>Date Applied: </label>
      <input
        type="date"
        value={form.dateApplied}
        onChange={(e) => setForm({ ...form, dateApplied: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleSubmit} disabled={saveMutation.isPending}>
        Submit
      </button>
      {validationError && <p>{validationError}</p>}
      {saveMutation.error && <p>{saveMutation.error.message}</p>}
      {success && <p>Application saved</p>}
    </>
  );
}

export default AddApplicationPage;
