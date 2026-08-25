import type { Application } from "../types/application";
import type { NewApplication } from "../types/application";

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
): Promise<void> {
  const response = await fetch("/tracker/saveApplication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
}
