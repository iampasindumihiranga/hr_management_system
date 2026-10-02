package com.hrmanagement.employeetype.repository;

import com.hrmanagement.employeetype.entity.EmployeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeTypeRepository
        extends JpaRepository<EmployeeType, Long> {

}