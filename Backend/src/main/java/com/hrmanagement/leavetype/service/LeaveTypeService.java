package com.hrmanagement.leavetype.service;

import com.hrmanagement.leavetype.entity.LeaveType;
import com.hrmanagement.leavetype.Repository.LeaveTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveTypeService {

    private final LeaveTypeRepository leaveTypeRepository;

    public LeaveTypeService(LeaveTypeRepository leaveTypeRepository) {
        this.leaveTypeRepository = leaveTypeRepository;
    }

    public List<LeaveType> getAllLeaveTypes() {
        return leaveTypeRepository.findAll();
    }

    public LeaveType getLeaveTypeById(Long id) {
        return leaveTypeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave type not found with ID: " + id
                        )
                );
    }

    public LeaveType createLeaveType(LeaveType leaveType) {
        return leaveTypeRepository.save(leaveType);
    }

    public LeaveType updateLeaveType(Long id, LeaveType details) {
        LeaveType leaveType = getLeaveTypeById(id);

        leaveType.setLeaveTypeName(details.getLeaveTypeName());
        leaveType.setDescription(details.getDescription());
        leaveType.setDefaultDays(details.getDefaultDays());
        leaveType.setStatus(details.getStatus());

        return leaveTypeRepository.save(leaveType);
    }

    public void deleteLeaveType(Long id) {
        LeaveType leaveType = getLeaveTypeById(id);
        leaveTypeRepository.delete(leaveType);
    }
}