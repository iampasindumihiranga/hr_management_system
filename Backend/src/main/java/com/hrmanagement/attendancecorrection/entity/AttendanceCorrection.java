package com.hrmanagement.attendancecorrection.entity;

import com.hrmanagement.attendance.entity.Attendance;
import com.hrmanagement.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance_corrections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceCorrection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long correctionId;

    @ManyToOne
    @JoinColumn(name = "attendance_id", nullable = false)
    private Attendance attendance;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDate correctionDate;

    private LocalTime requestedCheckIn;

    private LocalTime requestedCheckOut;

    private String requestedStatus;

    @Column(nullable = false)
    private String reason;

    private String status;

    private String reviewedBy;

    private String reviewerRemarks;
}