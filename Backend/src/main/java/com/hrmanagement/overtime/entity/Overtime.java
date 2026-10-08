package com.hrmanagement.overtime.entity;

import com.hrmanagement.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "overtime")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Overtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long overtimeId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDate overtimeDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Double overtimeHours;

    private String reason;

    private String status;

    private String approvedBy;

    private String remarks;
}