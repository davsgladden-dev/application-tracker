package dev.application_tracker.service;

import dev.application_tracker.Converter.ApplicationConverter;
import dev.application_tracker.dto.ApplicationDto;
import dev.application_tracker.entity.Application;
import dev.application_tracker.respository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static java.util.Arrays.stream;

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

    public void saveApplication(ApplicationDto applicationDto) {
        Application app = applicationConverter.convertToEntity(applicationDto);
        if (app.getDateApplied() == null) {
            app.setDateApplied(LocalDate.now());
        }
        applicationRepository.save(app);
    }

}
