package dev.application_tracker.Converter;

import dev.application_tracker.dto.ApplicationDto;
import dev.application_tracker.entity.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationConverter {

    public ApplicationDto convertToDto(Application entity) {
        ApplicationDto dto = new ApplicationDto();

        dto.setApplicationId(entity.getApplicationId());
        dto.setBusinessName(entity.getBusinessName());
        dto.setUrl(entity.getUrl());
        dto.setApplicationStatus(entity.getApplicationStatus());
        dto.setNote(entity.getNote());
        dto.setDateApplied(entity.getDateApplied());
        dto.setLastUpdated(entity.getLastUpdated());
        return dto;
    }

    public Application convertToEntity(ApplicationDto dto) {
        Application entity = new Application();

        entity.setBusinessName(dto.getBusinessName());
        entity.setUrl(dto.getUrl());
        entity.setApplicationStatus(dto.getApplicationStatus());
        entity.setNote(dto.getNote());
        entity.setDateApplied(dto.getDateApplied());
        entity.setLastUpdated(dto.getLastUpdated());
        return entity;
    }
}
