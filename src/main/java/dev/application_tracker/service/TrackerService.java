package dev.application_tracker.service;

import dev.application_tracker.converter.ApplicationConverter;
import dev.application_tracker.dto.ApplicationDto;
import dev.application_tracker.dto.NoteDto;
import dev.application_tracker.dto.StatusDto;
import dev.application_tracker.entity.Application;
import dev.application_tracker.entity.ApplicationStatus;
import dev.application_tracker.respository.ApplicationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrackerService {

    private final ApplicationConverter applicationConverter;
    private final ApplicationRepository applicationRepository;

    public List<ApplicationDto> getApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(applicationConverter::convertToDto)
                .toList();
    }

    public ApplicationDto getApplication(int applicationId) {
        Application entity = applicationRepository.findById(applicationId).orElseThrow();
        return applicationConverter.convertToDto(entity);
    }

    @Transactional
    public ApplicationDto saveApplication(ApplicationDto applicationDto) {
        Application app = applicationConverter.convertToEntity(applicationDto);
        if (app.getDateApplied() == null) {
            app.setDateApplied(LocalDate.now());
        }
        app.setLastUpdated(LocalDateTime.now());
        return applicationConverter.convertToDto((applicationRepository.save(app)));
    }

    @Transactional
    public ApplicationDto updateApplicationStatus(StatusDto statusDto) {
        Application app = applicationRepository.findById(statusDto.getApplicationId()).orElseThrow();

        app.setApplicationStatus(statusDto.getStatus());
        app.setLastUpdated(LocalDateTime.now());
        return applicationConverter.convertToDto(applicationRepository.save(app));
    }

    @Transactional
    public ApplicationDto updateApplicationNote(NoteDto noteDto) {
        Application app = applicationRepository.findById(noteDto.getApplicationId()).orElseThrow();

        app.setNote(noteDto.getNote());
        app.setLastUpdated(LocalDateTime.now());
        return applicationConverter.convertToDto(applicationRepository.save(app));
    }

}
