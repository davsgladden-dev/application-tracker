import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../api/applications";

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

  const counts = data.reduce<Record<string, number>>((acc, app) => {
    acc[app.applicationStatus] = (acc[app.applicationStatus] ?? 0) + 1;
    return acc;
  }, {});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <h2>Dashboard</h2>
      <div className="grid gird-cols-3 gap-4">
        <p>Application Counts: {data.length}</p>
        <br />
        {Object.entries(counts).map(([status, count]) => (
          <div
            className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm"
            key={status}
          >
            <div className="text-sm text-gray-600">{status}</div>
            <div className="text-2xl font-bold">{count}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardPage;
