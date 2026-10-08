package com.hrmanagement.report.service;

import com.hrmanagement.attendance.entity.Attendance;
import com.hrmanagement.attendance.repository.AttendanceRepository;
import com.hrmanagement.employee.entity.Employee;
import com.hrmanagement.employee.repository.EmployeeRepository;
import com.hrmanagement.leaverequest.entity.LeaveRequest;
import com.hrmanagement.leaverequest.repository.LeaveRequestRepository;
import com.hrmanagement.overtime.entity.Overtime;
import com.hrmanagement.overtime.Repository.OvertimeRepository;
import com.hrmanagement.report.dto.HrDashboardResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HrReportService {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final OvertimeRepository overtimeRepository;

    public HrReportService(
            EmployeeRepository employeeRepository,
            AttendanceRepository attendanceRepository,
            LeaveRequestRepository leaveRequestRepository,
            OvertimeRepository overtimeRepository) {

        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.overtimeRepository = overtimeRepository;
    }

    public HrDashboardResponse getDashboardSummary() {

        List<Employee> employees =
                employeeRepository.findAll();

        List<Attendance> attendance =
                attendanceRepository.findAll();

        List<LeaveRequest> leaveRequests =
                leaveRequestRepository.findAll();

        List<Overtime> overtime =
                overtimeRepository.findAll();

        long totalEmployees = employees.size();

        long activeEmployees = employees.stream()
                .filter(e ->
                        "ACTIVE".equalsIgnoreCase(e.getStatus()))
                .count();

        long inactiveEmployees =
                totalEmployees - activeEmployees;

        long presentCount = attendance.stream()
                .filter(a ->
                        "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();

        long absentCount = attendance.stream()
                .filter(a ->
                        "ABSENT".equalsIgnoreCase(a.getStatus()))
                .count();

        long lateCount = attendance.stream()
                .filter(a ->
                        "LATE".equalsIgnoreCase(a.getStatus()))
                .count();

        long pendingLeaveRequests = leaveRequests.stream()
                .filter(l ->
                        "PENDING".equalsIgnoreCase(l.getStatus()))
                .count();

        long approvedLeaveRequests = leaveRequests.stream()
                .filter(l ->
                        "APPROVED".equalsIgnoreCase(l.getStatus()))
                .count();

        long rejectedLeaveRequests = leaveRequests.stream()
                .filter(l ->
                        "REJECTED".equalsIgnoreCase(l.getStatus()))
                .count();

        long pendingOvertimeRecords = overtime.stream()
                .filter(o ->
                        "PENDING".equalsIgnoreCase(o.getStatus()))
                .count();

        long approvedOvertimeRecords = overtime.stream()
                .filter(o ->
                        "APPROVED".equalsIgnoreCase(o.getStatus()))
                .count();

        return new HrDashboardResponse(
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
                attendance.size(),
                presentCount,
                absentCount,
                lateCount,
                leaveRequests.size(),
                pendingLeaveRequests,
                approvedLeaveRequests,
                rejectedLeaveRequests,
                overtime.size(),
                pendingOvertimeRecords,
                approvedOvertimeRecords
        );
    }
}