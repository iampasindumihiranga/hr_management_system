package com.hrmanagement.leaverequest.controller;

import com.hrmanagement.leaverequest.entity.LeaveRequest;
import com.hrmanagement.leaverequest.service.LeaveRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(
            LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllRequests() {
        return ResponseEntity.ok(
                leaveRequestService.getAllRequests()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveRequestService.getRequestById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getRequestsByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                leaveRequestService
                        .getRequestsByEmployee(employeeId)
        );
    }

    @PostMapping
    public ResponseEntity<LeaveRequest> createRequest(
            @RequestBody LeaveRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(leaveRequestService.createRequest(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequest> updateRequest(
            @PathVariable Long id,
            @RequestBody LeaveRequest request) {

        return ResponseEntity.ok(
                leaveRequestService
                        .updateRequest(id, request)
        );
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveRequest(
            @PathVariable Long id,
            @RequestParam String approvedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                leaveRequestService
                        .approveRequest(id, approvedBy, remarks)
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectRequest(
            @PathVariable Long id,
            @RequestParam String approvedBy,
            @RequestParam(required = false) String remarks) {

        return ResponseEntity.ok(
                leaveRequestService
                        .rejectRequest(id, approvedBy, remarks)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable Long id) {

        leaveRequestService.deleteRequest(id);

        return ResponseEntity.noContent().build();
    }
}