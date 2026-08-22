package dev.application_tracker.service;

import dev.application_tracker.converter.ApplicationConverter;
import dev.application_tracker.dto.ApplicationDto;
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
    public void saveApplication(ApplicationDto applicationDto) {
        Application app = applicationConverter.convertToEntity(applicationDto);
        if (app.getDateApplied() == null) {
            app.setDateApplied(LocalDate.now());
        }
        applicationRepository.save(app);
    }

    @Transactional
    public void updateApplicationStatus(int applicationID, ApplicationStatus status) {
        if (status == null) {return;}
            Application app = applicationRepository.findById(applicationID).orElseThrow();

            app.setApplicationStatus(status);
            app.setLastUpdated(LocalDateTime.now());
            applicationRepository.save(app);
    }

    @Transactional
    public void updateApplicationNote(int applicationID, String note) {
        if (note == null) {return;}
            Application app = applicationRepository.findById(applicationID).orElseThrow();

            app.setNote(note);
            app.setLastUpdated(LocalDateTime.now());
            applicationRepository.save(app);
    }

}
