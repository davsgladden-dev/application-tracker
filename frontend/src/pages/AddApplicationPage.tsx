import { useState } from "react";
import type { NewApplication, ApplicationStatus } from "../types/application";
import { saveApplication, getStatuses } from "../api/applications";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const { data: statuses = {} } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

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
      <h2 className="mb-6 text-3xl font-semibold text-gray-900 tracking-tight">
        Add Application
      </h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name:
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application URL:
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Status:
          </label>
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={form.applicationStatus}
            onChange={(e) =>
              setForm({
                ...form,
                applicationStatus: e.target.value as ApplicationStatus,
              })
            }
          >
            {Object.entries(statuses).map(([name, displayName]) => (
              <option key={name} value={name}>
                {displayName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note:
          </label>
          <textarea
            rows={3}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Applied:
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="date"
            value={form.dateApplied}
            onChange={(e) => setForm({ ...form, dateApplied: e.target.value })}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={saveMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {validationError && (
          <p className="text-red-600 text-sm mt-2">{validationError}</p>
        )}
        {saveMutation.error && (
          <p className="text-red-600 text-sm mt-2">
            {saveMutation.error.message}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm mt-2">Application saved</p>
        )}
      </div>
    </>
  );
}

export default AddApplicationPage;
