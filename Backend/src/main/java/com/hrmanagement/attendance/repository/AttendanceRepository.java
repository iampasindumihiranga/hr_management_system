package com.hrmanagement.attendance.repository;

import com.hrmanagement.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeEmployeeId(Long employeeId);

    List<Attendance> findByAttendanceDate(LocalDate date);

    List<Attendance> findByEmployeeEmployeeIdAndAttendanceDate(
            Long employeeId,
            LocalDate date
    );
}