package com.hrmanagement.leavepolicy.service;

import com.hrmanagement.leavepolicy.entity.LeavePolicy;
import com.hrmanagement.leavepolicy.repository.LeavePolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeavePolicyService {

    private final LeavePolicyRepository leavePolicyRepository;

    public LeavePolicyService(LeavePolicyRepository leavePolicyRepository) {
        this.leavePolicyRepository = leavePolicyRepository;
    }

    public List<LeavePolicy> getAllPolicies() {
        return leavePolicyRepository.findAll();
    }

    public LeavePolicy getPolicyById(Long id) {
        return leavePolicyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave policy not found with ID: " + id
                        )
                );
    }

    public LeavePolicy createPolicy(LeavePolicy policy) {
        return leavePolicyRepository.save(policy);
    }

    public LeavePolicy updatePolicy(Long id, LeavePolicy details) {

        LeavePolicy policy = getPolicyById(id);

        policy.setLeaveType(details.getLeaveType());
        policy.setEmploymentType(details.getEmploymentType());
        policy.setAllowedDays(details.getAllowedDays());
        policy.setCarryForwardDays(details.getCarryForwardDays());
        policy.setStatus(details.getStatus());

        return leavePolicyRepository.save(policy);
    }

    public void deletePolicy(Long id) {
        LeavePolicy policy = getPolicyById(id);
        leavePolicyRepository.delete(policy);
    }
}