import type { Application } from "../types/application";
import type { NewApplication, ApplicationStatus } from "../types/application";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch("/tracker/applications");

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  const applications: Application[] = await response.json();

  return applications;
}

export async function saveApplication(
  application: NewApplication,
): Promise<Application> {
  const response = await fetch("/tracker/saveApplication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  return response.json();
}

export async function updateStatus(
  applicationId: number,
  status: ApplicationStatus,
): Promise<Application> {
  const response = await fetch("/tracker/updateStatus", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId, status }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  return response.json();
}

export async function updateNote(
  applicationId: number,
  note: string,
): Promise<Application> {
  const response = await fetch("/tracker/updateNote", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId, note }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error, Status: ${response.status}`);
  }

  return response.json();
}
