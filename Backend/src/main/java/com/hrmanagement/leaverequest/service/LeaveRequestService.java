package com.hrmanagement.leaverequest.service;

import com.hrmanagement.leaverequest.entity.LeaveRequest;
import com.hrmanagement.leaverequest.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }

    public LeaveRequest getRequestById(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave request not found with ID: " + id
                        )
                );
    }

    public List<LeaveRequest> getRequestsByEmployee(Long employeeId) {
        return leaveRequestRepository
                .findByEmployeeEmployeeId(employeeId);
    }

    public LeaveRequest createRequest(LeaveRequest request) {
        request.setStatus("PENDING");
        return leaveRequestRepository.save(request);
    }

    public LeaveRequest updateRequest(
            Long id,
            LeaveRequest requestDetails) {

        LeaveRequest request = getRequestById(id);

        request.setEmployee(requestDetails.getEmployee());
        request.setLeaveType(requestDetails.getLeaveType());
        request.setStartDate(requestDetails.getStartDate());
        request.setEndDate(requestDetails.getEndDate());
        request.setNumberOfDays(requestDetails.getNumberOfDays());
        request.setReason(requestDetails.getReason());
        request.setStatus(requestDetails.getStatus());
        request.setApprovedBy(requestDetails.getApprovedBy());
        request.setRemarks(requestDetails.getRemarks());

        return leaveRequestRepository.save(request);
    }

    public LeaveRequest approveRequest(
            Long id,
            String approvedBy,
            String remarks) {

        LeaveRequest request = getRequestById(id);

        request.setStatus("APPROVED");
        request.setApprovedBy(approvedBy);
        request.setRemarks(remarks);

        return leaveRequestRepository.save(request);
    }

    public LeaveRequest rejectRequest(
            Long id,
            String approvedBy,
            String remarks) {

        LeaveRequest request = getRequestById(id);

        request.setStatus("REJECTED");
        request.setApprovedBy(approvedBy);
        request.setRemarks(remarks);

        return leaveRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        LeaveRequest request = getRequestById(id);
        leaveRequestRepository.delete(request);
    }
}