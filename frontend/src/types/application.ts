
export type ApplicationStatus = 'Applied' | 'Rejected' | 'InterviewScheduled' | 'RejectedPostInterview' | 'OfferReceived' | 'OfferRejected' | 'OfferAccepted';

export interface ApplicationDto {
    applicationId: number;
    businessName: string;
    url: string;
    applicationStatus: ApplicationStatus;
    note: string;
    dateApplied: string | null;
    lastUpdated: string | null;
}