package dev.application_tracker.entity;

public enum ApplicationStatus {

    Applied(1),
    Rejected(2),
    InterviewScheduled(3),
    RejectedPostInterview(4),
    OfferReceived(5),
    OfferRejected(6),
    OfferAccepted(7),
    PositionClosed(8);

    ApplicationStatus(int status) {this.status = status;}

    private final int status;

}
