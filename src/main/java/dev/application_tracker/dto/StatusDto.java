package dev.application_tracker.dto;

import dev.application_tracker.entity.ApplicationStatus;
import lombok.Data;

@Data
public class StatusDto {

    private int applicationId;
    private ApplicationStatus status;
}
