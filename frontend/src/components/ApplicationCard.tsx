import type { Application } from "../types/application";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
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
        <dd>{application.applicationStatus}</dd>
        {application.note && (
          <>
            <dt className="text-gray-600">Note:</dt>
            <dd>{application.note}</dd>
          </>
        )}
        <dt className="text-gray-600">Date Applied:</dt>
        <dd>{application.dateApplied}</dd>
      </dl>
    </div>
  );
}
