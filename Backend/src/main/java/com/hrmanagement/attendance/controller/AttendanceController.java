package com.hrmanagement.attendance.controller;

import com.hrmanagement.attendance.entity.Attendance;
import com.hrmanagement.attendance.service.AttendanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(
                attendanceService.getAllAttendance()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getEmployeeAttendance(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                attendanceService
                        .getEmployeeAttendance(employeeId)
        );
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                attendanceService
                        .getAttendanceByDate(date)
        );
    }

    @PostMapping
    public ResponseEntity<Attendance> markAttendance(
            @RequestBody Attendance attendance) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        attendanceService
                                .markAttendance(attendance)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {

        return ResponseEntity.ok(
                attendanceService
                        .updateAttendance(id, attendance)
        );
    }

    @PutMapping("/{id}/checkout")
    public ResponseEntity<Attendance> checkOut(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.checkOut(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.noContent().build();
    }
}