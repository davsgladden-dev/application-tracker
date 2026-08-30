import type { ApplicationStatus } from "../types/application";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApplicationRow from "../components/ApplicationRow";
import {
  getApplications,
  updateNote,
  updateStatus,
  getStatuses,
} from "../api/applications";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { statusColors } from "../types/statusColors";

function ApplicationsPage() {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const { data: statuses = {} } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(column: string) {
    if (column !== sortColumn) {
      setSortColumn(column);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection("asc");
    }
  }

  const statusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: ApplicationStatus;
    }) => updateStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const noteMutation = useMutation({
    mutationFn: ({
      applicationId,
      note,
    }: {
      applicationId: number;
      note: string;
    }) => updateNote(applicationId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const statusFilter = searchParams.get("status");

  const filtered = statusFilter
    ? data.filter((app) => app.applicationStatus === statusFilter)
    : data;

  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        const aVal = String(a[sortColumn as keyof typeof a] ?? "");
        const bVal = String(b[sortColumn as keyof typeof b] ?? "");
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      })
    : filtered;

  function sortArrow(column: string) {
    if (sortColumn !== column) return "";
    return sortDirection === "asc" ? "▲" : "▼";
  }
  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Applications
        </h2>
        <p className="text-sm text-gray-500">{sorted.length} applications</p>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-600">Filter by status</span>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          onChange={(e) =>
            e.target.value === "All"
              ? setSearchParams({})
              : setSearchParams({ status: e.target.value })
          }
          value={statusFilter ?? "All"}
        >
          <option value="All">All</option>
          {Object.entries(statuses).map(([name, displayName]) => (
            <option key={name} value={name}>
              {displayName}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-collapse text-sm table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/6"
                onClick={() => handleSort("businessName")}
              >
                Business Name {sortArrow("businessName")}
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/6"
                onClick={() => handleSort("jobTitle")}
              >
                Job Title {sortArrow("jobTitle")}
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/12"
                onClick={() => handleSort("url")}
              >
                Url {sortArrow("url")}
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/6"
                onClick={() => handleSort("applicationStatus")}
              >
                Status {sortArrow("applicationStatus")}
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/6"
                onClick={() => handleSort("dateApplied")}
              >
                Date Applied {sortArrow("dateApplied")}
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide cursor-pointer hover:bg-gray-100 w-1/3"
                onClick={() => handleSort("note")}
              >
                Note {sortArrow("note")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((app) => (
              <ApplicationRow
                key={app.applicationId}
                application={app}
                statuses={statuses}
                onStatusChange={(applicationId, status) =>
                  statusMutation.mutate({ applicationId, status })
                }
                onNoteChange={(applicationId, note) =>
                  noteMutation.mutate({ applicationId, note })
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApplicationsPage;
