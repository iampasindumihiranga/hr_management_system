package com.hrmanagement.employeetype.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employee_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeTypeId;

    @Column(nullable = false, unique = true)
    private String typeName;

    private String description;

    private String status;
}