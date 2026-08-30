import { useQuery } from "@tanstack/react-query";
import { getApplications, getStatuses } from "../api/applications";
import { Link } from "react-router-dom";
import { statusColors } from "../types/statusColors";

function DashboardPage() {
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

  const counts = data.reduce<Record<string, number>>((acc, app) => {
    acc[app.applicationStatus] = (acc[app.applicationStatus] ?? 0) + 1;
    return acc;
  }, {});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">{data.length} applications</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(counts)
          .sort()
          .map(([status, count]) => (
            <Link
              to={`/applications?status=${status}`}
              className={`p-5 border-l-4 rounded-lg bg-white shadow hover:bg-gray-50 hover:shadow-md transition-shadow cursor-pointer ${statusColors[status].border}`}
              key={status}
            >
              <div
                className={`text-3xl font-bold ${statusColors[status].text}`}
              >
                {count}
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                {statuses[status]}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default DashboardPage;
