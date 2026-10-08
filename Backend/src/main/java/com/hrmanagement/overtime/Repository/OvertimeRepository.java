package com.hrmanagement.overtime.Repository;

import com.hrmanagement.overtime.entity.Overtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OvertimeRepository
        extends JpaRepository<Overtime, Long> {

    List<Overtime> findByEmployeeEmployeeId(Long employeeId);

    List<Overtime> findByOvertimeDate(LocalDate date);

    List<Overtime> findByStatus(String status);
}