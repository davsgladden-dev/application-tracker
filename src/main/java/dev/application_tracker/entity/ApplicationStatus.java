package dev.application_tracker.entity;

import lombok.Getter;

@Getter
public enum ApplicationStatus {

    Applied("Applied"),
    Rejected("Rejected"),
    InterviewScheduled("Interview Scheduled"),
    RejectedPostInterview("Rejected Post Interview"),
    OfferReceived("Offer Received"),
    OfferRejected("Offer Rejected"),
    OfferAccepted("Offer Accepted"),
    PositionClosed("Position Closed"),
    NoLongerAccepting("No Longer Accepting");

    ApplicationStatus(String displayName) {this.displayName = displayName;}

    private final String displayName;

}
