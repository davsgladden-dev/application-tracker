export type ApplicationStatus =
  | "Applied"
  | "Rejected"
  | "InterviewScheduled"
  | "RejectedPostInterview"
  | "OfferReceived"
  | "OfferRejected"
  | "OfferAccepted"
  | "PositionClosed"
  | "NoLongerAccepting";

export interface Application {
  applicationId: number;
  businessName: string;
  jobTitle: string;
  url: string;
  applicationStatus: ApplicationStatus;
  note: string;
  dateApplied: string;
  lastUpdated: string;
}

export type NewApplication = Omit<Application, "applicationId" | "lastUpdated">;
