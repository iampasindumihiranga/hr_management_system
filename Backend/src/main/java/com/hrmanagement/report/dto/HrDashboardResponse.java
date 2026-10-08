package com.hrmanagement.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HrDashboardResponse {

    private long totalEmployees;

    private long activeEmployees;

    private long inactiveEmployees;

    private long totalAttendanceRecords;

    private long presentCount;

    private long absentCount;

    private long lateCount;

    private long totalLeaveRequests;

    private long pendingLeaveRequests;

    private long approvedLeaveRequests;

    private long rejectedLeaveRequests;

    private long totalOvertimeRecords;

    private long pendingOvertimeRecords;

    private long approvedOvertimeRecords;
}