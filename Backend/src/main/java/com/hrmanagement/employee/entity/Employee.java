package com.hrmanagement.employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @Column(nullable = false, unique = true)
    private String employeeCode;

    @Column(nullable = false)
    private String employeeName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String department;

    private String designation;

    private String gender;

    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private LocalDate joiningDate;

    private String employmentType;

    private String location;

    private String manager;

    private String status;
}