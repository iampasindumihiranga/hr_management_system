package com.hrmanagement.workSchedule.controller;

import com.hrmanagement.workSchedule.service.WorkScheduleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/work-schedules")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    public WorkScheduleController(WorkScheduleService workScheduleService) {
        this.workScheduleService = workScheduleService;
    }

    @GetMapping
    public ResponseEntity<?> getAllSchedules() {
        try {
            Object schedules = workScheduleService.getClass()
                    .getMethod("getAllSchedules")
                    .invoke(workScheduleService);
            return ResponseEntity.ok(schedules);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to retrieve work schedules", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(
            @PathVariable Long id) {
        try {
            Object schedule = workScheduleService.getClass()
                    .getMethod("getScheduleById", Long.class)
                    .invoke(workScheduleService, id);
            return ResponseEntity.ok(schedule);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to retrieve work schedule with id " + id, e);
        }
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getEmployeeSchedules(
            @PathVariable Long employeeId) {
        try {
            Object schedules = workScheduleService.getClass()
                    .getMethod("getEmployeeSchedules", Long.class)
                    .invoke(workScheduleService, employeeId);
            return ResponseEntity.ok(schedules);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to retrieve employee work schedules", e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createSchedule(
            @RequestBody Object schedule) {
        try {
            Object createdSchedule = workScheduleService.getClass()
                    .getMethod("createSchedule", Object.class)
                    .invoke(workScheduleService, schedule);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdSchedule);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to create work schedule", e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(
            @PathVariable Long id,
            @RequestBody Object schedule) {
        try {
            Object updatedSchedule = workScheduleService.getClass()
                    .getMethod("updateSchedule", Long.class, Object.class)
                    .invoke(workScheduleService, id, schedule);
            return ResponseEntity.ok(updatedSchedule);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to update work schedule with id " + id, e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(
            @PathVariable Long id) {

        workScheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}