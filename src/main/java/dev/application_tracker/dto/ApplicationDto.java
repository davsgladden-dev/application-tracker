package dev.application_tracker.dto;

import dev.application_tracker.entity.ApplicationStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ApplicationDto {
    private int applicationId;
    private String businessName;
    private String url;
    private ApplicationStatus applicationStatus;
    private String note;
    private LocalDate dateApplied;
    private LocalDate lastUpdated;
}
