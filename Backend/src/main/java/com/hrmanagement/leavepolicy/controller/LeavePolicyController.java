package com.hrmanagement.leavepolicy.controller;

import com.hrmanagement.leavepolicy.entity.LeavePolicy;
import com.hrmanagement.leavepolicy.service.LeavePolicyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-policies")
@CrossOrigin(origins = "http://localhost:5173")
public class LeavePolicyController {

    private final LeavePolicyService leavePolicyService;

    public LeavePolicyController(LeavePolicyService leavePolicyService) {
        this.leavePolicyService = leavePolicyService;
    }

    @GetMapping
    public ResponseEntity<List<LeavePolicy>> getAllPolicies() {
        return ResponseEntity.ok(
                leavePolicyService.getAllPolicies()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeavePolicy> getPolicyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leavePolicyService.getPolicyById(id)
        );
    }

    @PostMapping
    public ResponseEntity<LeavePolicy> createPolicy(
            @RequestBody LeavePolicy policy) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(leavePolicyService.createPolicy(policy));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeavePolicy> updatePolicy(
            @PathVariable Long id,
            @RequestBody LeavePolicy policy) {

        return ResponseEntity.ok(
                leavePolicyService.updatePolicy(id, policy)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(
            @PathVariable Long id) {

        leavePolicyService.deletePolicy(id);

        return ResponseEntity.noContent().build();
    }
}