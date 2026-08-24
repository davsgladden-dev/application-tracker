import type { Application } from "../types/application";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch("/tracker/applications");

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  const applications: Application[] = await response.json();

  return applications;
}
