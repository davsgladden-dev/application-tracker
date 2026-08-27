package dev.application_tracker.contoller;

import dev.application_tracker.dto.ApplicationDto;
import dev.application_tracker.dto.NoteDto;
import dev.application_tracker.dto.StatusDto;
import dev.application_tracker.entity.Application;
import dev.application_tracker.entity.ApplicationStatus;
import dev.application_tracker.service.TrackerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/application/{applicationId}")
    public ApplicationDto getApplication(@PathVariable int applicationId) {
        return trackerService.getApplication(applicationId);
    }

    @PostMapping("/saveApplication")
    public ResponseEntity<ApplicationDto> saveApplication(@RequestBody ApplicationDto applicationDto) {
        return ResponseEntity.ok().body(trackerService.saveApplication(applicationDto));
    }

    @PatchMapping("/updateStatus")
    public ResponseEntity<ApplicationDto> updateApplicationStatus(@RequestBody StatusDto statusDto) {
         return ResponseEntity.ok().body(trackerService.updateApplicationStatus(statusDto));
    }

    @PatchMapping("/updateNote")
    public ResponseEntity<ApplicationDto> updateApplicationNote(@RequestBody NoteDto noteDto) {
        return ResponseEntity.ok().body(trackerService.updateApplicationNote(noteDto));
    }

}
