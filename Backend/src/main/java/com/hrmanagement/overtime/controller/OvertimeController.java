package com.hrmanagement.overtime.controller;

import com.hrmanagement.overtime.entity.Overtime;
import com.hrmanagement.overtime.service.OvertimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/overtime")
@CrossOrigin(origins = "http://localhost:5173")
public class OvertimeController {

    private final OvertimeService overtimeService;

    public OvertimeController(
            OvertimeService overtimeService) {
        this.overtimeService = overtimeService;
    }

    @GetMapping
    public ResponseEntity<List<Overtime>> getAllOvertime() {
        return ResponseEntity.ok(
                overtimeService.getAllOvertime()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Overtime> getOvertimeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                overtimeService.getOvertimeById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Overtime>> getEmployeeOvertime(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                overtimeService
                        .getEmployeeOvertime(employeeId)
        );
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Overtime>> getOvertimeByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                overtimeService
                        .getOvertimeByDate(date)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Overtime>> getOvertimeByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                overtimeService
                        .getOvertimeByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<Overtime> createOvertime(
            @RequestBody Overtime overtime) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        overtimeService
                                .createOvertime(overtime)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Overtime> updateOvertime(
            @PathVariable Long id,
            @RequestBody Overtime overtime) {

        return ResponseEntity.ok(
                overtimeService
                        .updateOvertime(id, overtime)
        );
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Overtime> approveOvertime(
            @PathVariable Long id,
            @RequestParam String approvedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                overtimeService
                        .approveOvertime(
                                id,
                                approvedBy,
                                remarks
                        )
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Overtime> rejectOvertime(
            @PathVariable Long id,
            @RequestParam String approvedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                overtimeService
                        .rejectOvertime(
                                id,
                                approvedBy,
                                remarks
                        )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOvertime(
            @PathVariable Long id) {

        overtimeService.deleteOvertime(id);

        return ResponseEntity.noContent().build();
    }
}