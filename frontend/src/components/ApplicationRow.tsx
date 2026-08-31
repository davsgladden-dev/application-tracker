import type { Application, ApplicationStatus } from "../types/application";
import { useState } from "react";
import { statusColors } from "../types/statusColors";

interface ApplicationRowProps {
  application: Application;
  statuses: Record<string, string>;
  onStatusChange: (applicationId: number, status: ApplicationStatus) => void;
  onNoteChange: (applicationId: number, note: string) => void;
}

function ApplicationRow({
  application,
  onStatusChange,
  onNoteChange,
  statuses,
}: ApplicationRowProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState(application.note);
  const [editingStatus, setEditingStatus] = useState<boolean>(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3">{application.businessName}</td>
      <td className="px-4 py-3">{application.jobTitle}</td>
      <td className="px-4 py-3">
        {application.url && (
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Link
          </a>
        )}
      </td>
      <td className="px-4 py-3" onClick={() => setEditingStatus(true)}>
        {editingStatus ? (
          <select
            autoFocus
            onBlur={() => setEditingStatus(false)}
            className="border border-gray-300 rounded px-2 py-1"
            value={application.applicationStatus}
            onChange={(e) => {
              onStatusChange(
                application.applicationId,
                e.target.value as ApplicationStatus,
              );
              setEditingStatus(false);
            }}
          >
            {Object.entries(statuses).map(([name, displayName]) => (
              <option key={name} value={name}>
                {displayName}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.applicationStatus].text} ${statusColors[application.applicationStatus].bg}`}
          >
            {statuses[application.applicationStatus]}
          </span>
        )}
      </td>
      <td className="px-4 py-3">{application.dateApplied}</td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 border border-gray-300 rounded px-2 py-1"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
              onClick={() => {
                onNoteChange(application.applicationId, draft);
                setEditing(false);
              }}
            >
              Save Note
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
              onClick={() => {
                setDraft(application.note);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            {application.note}
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
              onClick={() => setEditing(true)}
            >
              {application.note ? "Edit Note" : "Add Note"}
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default ApplicationRow;
