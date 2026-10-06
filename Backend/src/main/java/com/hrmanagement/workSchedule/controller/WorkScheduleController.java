package com.hrmanagement.workschedule.controller;

import com.hrmanagement.workschedule.entity.WorkSchedule;
import com.hrmanagement.workschedule.service.WorkScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-schedules")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    public WorkScheduleController(
            WorkScheduleService workScheduleService) {
        this.workScheduleService = workScheduleService;
    }

    @GetMapping
    public ResponseEntity<List<WorkSchedule>> getAllSchedules() {
        return ResponseEntity.ok(
                workScheduleService.getAllSchedules()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkSchedule> getScheduleById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workScheduleService.getScheduleById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<WorkSchedule>> getEmployeeSchedules(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                workScheduleService
                        .getEmployeeSchedules(employeeId)
        );
    }

    @PostMapping
    public ResponseEntity<WorkSchedule> createSchedule(
            @RequestBody WorkSchedule schedule) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        workScheduleService
                                .createSchedule(schedule)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkSchedule> updateSchedule(
            @PathVariable Long id,
            @RequestBody WorkSchedule schedule) {

        return ResponseEntity.ok(
                workScheduleService
                        .updateSchedule(id, schedule)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(
            @PathVariable Long id) {

        workScheduleService.deleteSchedule(id);

        return ResponseEntity.noContent().build();
    }
}