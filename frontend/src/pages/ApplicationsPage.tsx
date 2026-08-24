import { useState, useEffect } from "react";
import type { Application } from "../types/application";
import { getApplications } from "../api/applications";
import ApplicationCard from "../components/ApplicationCard";

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error loading applications",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {applications.map((app) => (
        <ApplicationCard
          key={app.applicationId}
          application={app}
        ></ApplicationCard>
      ))}
      <br />
      <p>Application Count: {applications.length}</p>
    </>
  );
}

export default ApplicationsPage;
