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
  url: string | null;
  applicationStatus: ApplicationStatus;
  note: string | null;
  dateApplied: string | null;
  lastUpdated: string | null;
}
