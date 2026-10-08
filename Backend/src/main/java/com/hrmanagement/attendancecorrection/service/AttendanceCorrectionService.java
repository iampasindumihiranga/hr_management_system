package com.hrmanagement.attendancecorrection.service;

import com.hrmanagement.attendance.entity.Attendance;
import com.hrmanagement.attendance.repository.AttendanceRepository;
import com.hrmanagement.attendancecorrection.entity.AttendanceCorrection;
import com.hrmanagement.attendancecorrection.Repository.AttendanceCorrectionRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class AttendanceCorrectionService {

    private final AttendanceCorrectionRepository correctionRepository;
    private final AttendanceRepository attendanceRepository;

    public AttendanceCorrectionService(
            AttendanceCorrectionRepository correctionRepository,
            AttendanceRepository attendanceRepository) {

        this.correctionRepository = correctionRepository;
        this.attendanceRepository = attendanceRepository;
    }

    public List<AttendanceCorrection> getAllCorrections() {
        return correctionRepository.findAll();
    }

    public AttendanceCorrection getCorrectionById(Long id) {
        return correctionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Attendance correction not found with ID: " + id
                        )
                );
    }

    public List<AttendanceCorrection> getEmployeeCorrections(
            Long employeeId) {

        return correctionRepository
                .findByEmployeeEmployeeId(employeeId);
    }

    public List<AttendanceCorrection> getCorrectionsByStatus(
            String status) {

        return correctionRepository.findByStatus(status);
    }

    public AttendanceCorrection createCorrection(
            AttendanceCorrection correction) {

        correction.setStatus("PENDING");

        return correctionRepository.save(correction);
    }

    public AttendanceCorrection approveCorrection(
            Long id,
            String reviewedBy,
            String remarks) {

        AttendanceCorrection correction =
                getCorrectionById(id);

        Attendance attendance =
                correction.getAttendance();

        attendance.setCheckIn(
                correction.getRequestedCheckIn()
        );

        attendance.setCheckOut(
                correction.getRequestedCheckOut()
        );

        attendance.setStatus(
                correction.getRequestedStatus()
        );

        if (correction.getRequestedCheckIn() != null &&
                correction.getRequestedCheckOut() != null) {

            Duration duration = Duration.between(
                    correction.getRequestedCheckIn(),
                    correction.getRequestedCheckOut()
            );

            attendance.setWorkingHours(
                    duration.toMinutes() / 60.0
            );
        }

        attendanceRepository.save(attendance);

        correction.setStatus("APPROVED");
        correction.setReviewedBy(reviewedBy);
        correction.setReviewerRemarks(remarks);

        return correctionRepository.save(correction);
    }

    public AttendanceCorrection rejectCorrection(
            Long id,
            String reviewedBy,
            String remarks) {

        AttendanceCorrection correction =
                getCorrectionById(id);

        correction.setStatus("REJECTED");
        correction.setReviewedBy(reviewedBy);
        correction.setReviewerRemarks(remarks);

        return correctionRepository.save(correction);
    }

    public void deleteCorrection(Long id) {

        AttendanceCorrection correction =
                getCorrectionById(id);

        correctionRepository.delete(correction);
    }
}