package com.hrmanagement.attendancecorrection.Repository;

import com.hrmanagement.attendancecorrection.entity.AttendanceCorrection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceCorrectionRepository
        extends JpaRepository<AttendanceCorrection, Long> {

    List<AttendanceCorrection> findByEmployeeEmployeeId(
            Long employeeId
    );

    List<AttendanceCorrection> findByStatus(
            String status
    );
}