package com.hrmanagement.leavetype.controller;

import com.hrmanagement.leavetype.entity.LeaveType;
import com.hrmanagement.leavetype.service.LeaveTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-types")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveTypeController {

    private final LeaveTypeService leaveTypeService;

    public LeaveTypeController(LeaveTypeService leaveTypeService) {
        this.leaveTypeService = leaveTypeService;
    }

    @GetMapping
    public ResponseEntity<List<LeaveType>> getAllLeaveTypes() {
        return ResponseEntity.ok(leaveTypeService.getAllLeaveTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveType> getLeaveTypeById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                leaveTypeService.getLeaveTypeById(id)
        );
    }

    @PostMapping
    public ResponseEntity<LeaveType> createLeaveType(
            @RequestBody LeaveType leaveType) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(leaveTypeService.createLeaveType(leaveType));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveType> updateLeaveType(
            @PathVariable Long id,
            @RequestBody LeaveType leaveType) {

        return ResponseEntity.ok(
                leaveTypeService.updateLeaveType(id, leaveType)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveType(
            @PathVariable Long id) {

        leaveTypeService.deleteLeaveType(id);
        return ResponseEntity.noContent().build();
    }
}