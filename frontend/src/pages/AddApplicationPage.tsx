import { useState } from "react";
import type { NewApplication, ApplicationStatus } from "../types/application";
import { saveApplication } from "../api/applications";

function AddApplicationPage() {
  const [form, setForm] = useState<NewApplication>({
    businessName: "",
    url: "",
    applicationStatus: "Applied",
    note: "",
    dateApplied: "",
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit() {
    setError(null);
    setSuccess(false);
    if (form.businessName === "") {
      setError("Business name is required");
      return;
    }
    setSaving(true);
    try {
      await saveApplication(form);
      setForm({
        businessName: "",
        url: "",
        applicationStatus: "Applied",
        note: "",
        dateApplied: "",
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving application");
    } finally {
      setSaving(false);
    }
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
      <button onClick={handleSubmit} disabled={saving}>
        Submit
      </button>
      {error && <p>{error}</p>}
      {success && <p>Application saved</p>}
    </>
  );
}

export default AddApplicationPage;
