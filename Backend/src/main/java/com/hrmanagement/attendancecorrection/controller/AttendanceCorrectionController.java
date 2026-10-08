package com.hrmanagement.attendancecorrection.controller;

import com.hrmanagement.attendancecorrection.entity.AttendanceCorrection;
import com.hrmanagement.attendancecorrection.service.AttendanceCorrectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance-corrections")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceCorrectionController {

    private final AttendanceCorrectionService correctionService;

    public AttendanceCorrectionController(
            AttendanceCorrectionService correctionService) {

        this.correctionService = correctionService;
    }

    @GetMapping
    public ResponseEntity<List<AttendanceCorrection>>
    getAllCorrections() {

        return ResponseEntity.ok(
                correctionService.getAllCorrections()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceCorrection>
    getCorrectionById(@PathVariable Long id) {

        return ResponseEntity.ok(
                correctionService.getCorrectionById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceCorrection>>
    getEmployeeCorrections(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                correctionService
                        .getEmployeeCorrections(employeeId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AttendanceCorrection>>
    getCorrectionsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                correctionService
                        .getCorrectionsByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<AttendanceCorrection>
    createCorrection(
            @RequestBody AttendanceCorrection correction) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        correctionService
                                .createCorrection(correction)
                );
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<AttendanceCorrection>
    approveCorrection(
            @PathVariable Long id,
            @RequestParam String reviewedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                correctionService.approveCorrection(
                        id,
                        reviewedBy,
                        remarks
                )
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<AttendanceCorrection>
    rejectCorrection(
            @PathVariable Long id,
            @RequestParam String reviewedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                correctionService.rejectCorrection(
                        id,
                        reviewedBy,
                        remarks
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCorrection(
            @PathVariable Long id) {

        correctionService.deleteCorrection(id);

        return ResponseEntity.noContent().build();
    }
}