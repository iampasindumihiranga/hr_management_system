package com.hrmanagement.attendance.service;

import com.hrmanagement.attendance.entity.Attendance;
import com.hrmanagement.attendance.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Attendance not found with ID: " + id
                        )
                );
    }

    public List<Attendance> getEmployeeAttendance(Long employeeId) {
        return attendanceRepository
                .findByEmployeeEmployeeId(employeeId);
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository
                .findByAttendanceDate(date);
    }

    public Attendance markAttendance(Attendance attendance) {

        attendance.setAttendanceDate(LocalDate.now());

        if (attendance.getCheckIn() == null) {
            attendance.setCheckIn(LocalTime.now());
        }

        if (attendance.getStatus() == null) {
            attendance.setStatus("PRESENT");
        }

        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(
            Long id,
            Attendance details) {

        Attendance attendance = getAttendanceById(id);

        attendance.setEmployee(details.getEmployee());
        attendance.setAttendanceDate(details.getAttendanceDate());
        attendance.setCheckIn(details.getCheckIn());
        attendance.setCheckOut(details.getCheckOut());
        attendance.setWorkingHours(details.getWorkingHours());
        attendance.setStatus(details.getStatus());
        attendance.setRemarks(details.getRemarks());

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(Long id) {

        Attendance attendance = getAttendanceById(id);

        attendance.setCheckOut(LocalTime.now());

        if (attendance.getCheckIn() != null) {

            Duration duration = Duration.between(
                    attendance.getCheckIn(),
                    attendance.getCheckOut()
            );

            double hours = duration.toMinutes() / 60.0;

            attendance.setWorkingHours(hours);
        }

        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {

        Attendance attendance = getAttendanceById(id);

        attendanceRepository.delete(attendance);
    }
}