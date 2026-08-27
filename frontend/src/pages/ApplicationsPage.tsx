import type { Application, ApplicationStatus } from "../types/application";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApplicationCard from "../components/ApplicationCard";
import { getApplications, updateNote, updateStatus } from "../api/applications";

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
  const queryClient = useQueryClient();
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
  return (
    <>
      {data.map((app) => (
        <ApplicationCard
          key={app.applicationId}
          application={app}
          onStatusChange={(applicationId, status) =>
            statusMutation.mutate({ applicationId, status })
          }
          onNoteChange={(applicationId, note) =>
            noteMutation.mutate({ applicationId, note })
          }
        ></ApplicationCard>
      ))}
      <br />
      <p>Application Count: {data.length}</p>
    </>
  );
}

export default ApplicationsPage;
