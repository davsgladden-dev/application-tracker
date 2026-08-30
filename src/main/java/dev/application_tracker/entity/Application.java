package dev.application_tracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationID")
    private int applicationId;

    @Column(name = "BusinessName")
    private String businessName;

    @Column(name = "JobTitle")
    private String jobTitle;

    @Column(name = "URL")
    private String url;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    @Column(name = "Note")
    private String note;

    @Column(name = "DateApplied")
    private LocalDate dateApplied;

    @Column(name = "LastUpdated")
    private LocalDateTime lastUpdated;
}
