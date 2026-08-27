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
      <br />
      <p>Application Counts: {data.length}</p>
      <br />
      {Object.entries(counts).map(([status, count]) => (
        <div key={status}>
          {status}: {count}
        </div>
      ))}
    </>
  );
}

export default DashboardPage;
