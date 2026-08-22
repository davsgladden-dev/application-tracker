package dev.application_tracker.contoller;

import dev.application_tracker.dto.ApplicationDto;
import dev.application_tracker.entity.ApplicationStatus;
import dev.application_tracker.service.TrackerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tracker")
@RequiredArgsConstructor
public class Controller {

    public final TrackerService trackerService;

    @GetMapping("/statuses")
    public ApplicationStatus[] getApplicationStatusList() {
        return ApplicationStatus.values();
    }

    @GetMapping("/applications")
    public List<ApplicationDto> getApplications() {
        return trackerService.getApplications();
    }

    @GetMapping("/application/{id}")
    public ApplicationDto getApplication(@RequestParam int applicationId) {
        return trackerService.getApplication(applicationId);
    }

    @PostMapping("/saveApplication")
    public ResponseEntity<String> saveApplication(@RequestBody ApplicationDto applicationDto) {
        trackerService.saveApplication(applicationDto);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateApplicationStatus(@RequestParam int applicationId, @RequestParam ApplicationStatus status) {
        trackerService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/updateNote")
    public ResponseEntity<String> updateApplicationNote(@RequestParam int applicationId, @RequestParam String note) {
        trackerService.updateApplicationNote(applicationId, note);
        return ResponseEntity.ok("success");
    }

}
