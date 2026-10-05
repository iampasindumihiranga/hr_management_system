package com.hrmanagement.employeeType.repository;

import com.hrmanagement.employeeType.entity.EmployeeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeTypeRepository
extends JpaRepository<EmployeeType, Long> {

}