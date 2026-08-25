export type ApplicationStatus =
  | "Applied"
  | "Rejected"
  | "InterviewScheduled"
  | "RejectedPostInterview"
  | "OfferReceived"
  | "OfferRejected"
  | "OfferAccepted";

export interface Application {
  applicationId: number;
  businessName: string;
  url: string;
  applicationStatus: ApplicationStatus;
  note: string;
  dateApplied: string;
  lastUpdated: string;
}

export type NewApplication = Omit<Application, "applicationId" | "lastUpdated">;
