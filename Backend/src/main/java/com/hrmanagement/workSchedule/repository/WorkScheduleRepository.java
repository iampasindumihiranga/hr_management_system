package com.hrmanagement.workSchedule.repository;

import com.hrmanagement.workSchedule.entity.WorkSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkScheduleRepository
        extends JpaRepository<WorkSchedule, Long> {

    List<WorkSchedule> findByEmployeeEmployeeId(Long employeeId);

    List<WorkSchedule> findByDayOfWeek(String dayOfWeek);
}