package com.hrmanagement.overtime.service;

import com.hrmanagement.overtime.entity.Overtime;
import com.hrmanagement.overtime.Repository.OvertimeRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class OvertimeService {

    private final OvertimeRepository overtimeRepository;

    public OvertimeService(OvertimeRepository overtimeRepository) {
        this.overtimeRepository = overtimeRepository;
    }

    public List<Overtime> getAllOvertime() {
        return overtimeRepository.findAll();
    }

    public Overtime getOvertimeById(Long id) {
        return overtimeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Overtime record not found with ID: " + id
                        )
                );
    }

    public List<Overtime> getEmployeeOvertime(Long employeeId) {
        return overtimeRepository
                .findByEmployeeEmployeeId(employeeId);
    }

    public List<Overtime> getOvertimeByDate(LocalDate date) {
        return overtimeRepository.findByOvertimeDate(date);
    }

    public List<Overtime> getOvertimeByStatus(String status) {
        return overtimeRepository.findByStatus(status);
    }

    public Overtime createOvertime(Overtime overtime) {

        if (overtime.getStatus() == null) {
            overtime.setStatus("PENDING");
        }

        calculateOvertimeHours(overtime);

        return overtimeRepository.save(overtime);
    }

    public Overtime updateOvertime(
            Long id,
            Overtime details) {

        Overtime overtime = getOvertimeById(id);

        overtime.setEmployee(details.getEmployee());
        overtime.setOvertimeDate(details.getOvertimeDate());
        overtime.setStartTime(details.getStartTime());
        overtime.setEndTime(details.getEndTime());
        overtime.setReason(details.getReason());
        overtime.setStatus(details.getStatus());
        overtime.setApprovedBy(details.getApprovedBy());
        overtime.setRemarks(details.getRemarks());

        calculateOvertimeHours(overtime);

        return overtimeRepository.save(overtime);
    }

    public Overtime approveOvertime(
            Long id,
            String approvedBy,
            String remarks) {

        Overtime overtime = getOvertimeById(id);

        overtime.setStatus("APPROVED");
        overtime.setApprovedBy(approvedBy);
        overtime.setRemarks(remarks);

        return overtimeRepository.save(overtime);
    }

    public Overtime rejectOvertime(
            Long id,
            String approvedBy,
            String remarks) {

        Overtime overtime = getOvertimeById(id);

        overtime.setStatus("REJECTED");
        overtime.setApprovedBy(approvedBy);
        overtime.setRemarks(remarks);

        return overtimeRepository.save(overtime);
    }

    private void calculateOvertimeHours(Overtime overtime) {

        LocalTime start = overtime.getStartTime();
        LocalTime end = overtime.getEndTime();

        if (start != null && end != null) {

            Duration duration = Duration.between(start, end);

            double hours = duration.toMinutes() / 60.0;

            overtime.setOvertimeHours(hours);
        }
    }

    public void deleteOvertime(Long id) {

        Overtime overtime = getOvertimeById(id);

        overtimeRepository.delete(overtime);
    }
}