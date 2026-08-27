import type { Application, ApplicationStatus } from "../types/application";
import { useState } from "react";

interface ApplicationCardProps {
  application: Application;
  onStatusChange: (applicationId: number, status: ApplicationStatus) => void;
  onNoteChange: (applicationId: number, note: string) => void;
}

export default function ApplicationCard({
  application,
  onStatusChange,
  onNoteChange,
}: ApplicationCardProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState(application.note);

  return (
    <div className="border p-4 space-y-4">
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt className="text-gray-600">Business Name:</dt>
        <dd>{application.businessName}</dd>
        {application.url && (
          <>
            <dt className="text-gray-600">URL:</dt>
            <dd>{application.url}</dd>
          </>
        )}
        <dt className="text-gray-600">Application Status:</dt>
        <select
          value={application.applicationStatus}
          onChange={(e) =>
            onStatusChange(
              application.applicationId,
              e.target.value as ApplicationStatus,
            )
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
        {!editing && (
          <>
            <dt className="text-gray-600">Note:</dt>
            <dd>
              {application.note}
              <button onClick={() => setEditing(true)}>
                {application.note ? "Edit Note" : "Add Note"}
              </button>
            </dd>
          </>
        )}
        {editing && (
          <>
            <dt className="text-gray-600">Note:</dt>
            <dd>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button
                onClick={() => {
                  onNoteChange(application.applicationId, draft);
                  setEditing(false);
                }}
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setDraft(application.note);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </dd>
          </>
        )}
        <dt className="text-gray-600">Date Applied:</dt>
        <dd>{application.dateApplied}</dd>
      </dl>
    </div>
  );
}
