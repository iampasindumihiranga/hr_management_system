package com.hrmanagement.workschedule.service;

import com.hrmanagement.workschedule.entity.WorkSchedule;
import com.hrmanagement.workschedule.repository.WorkScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkScheduleService {

    private final WorkScheduleRepository workScheduleRepository;

    public WorkScheduleService(
            WorkScheduleRepository workScheduleRepository) {
        this.workScheduleRepository = workScheduleRepository;
    }

    public List<WorkSchedule> getAllSchedules() {
        return workScheduleRepository.findAll();
    }

    public WorkSchedule getScheduleById(Long id) {
        return workScheduleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Work schedule not found with ID: " + id
                        )
                );
    }

    public List<WorkSchedule> getEmployeeSchedules(Long employeeId) {
        return workScheduleRepository
                .findByEmployeeEmployeeId(employeeId);
    }

    public WorkSchedule createSchedule(
            WorkSchedule schedule) {

        return workScheduleRepository.save(schedule);
    }

    public WorkSchedule updateSchedule(
            Long id,
            WorkSchedule details) {

        WorkSchedule schedule = getScheduleById(id);

        schedule.setEmployee(details.getEmployee());
        schedule.setDayOfWeek(details.getDayOfWeek());
        schedule.setStartTime(details.getStartTime());
        schedule.setEndTime(details.getEndTime());
        schedule.setBreakHours(details.getBreakHours());
        schedule.setScheduleType(details.getScheduleType());
        schedule.setStatus(details.getStatus());

        return workScheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {

        WorkSchedule schedule = getScheduleById(id);

        workScheduleRepository.delete(schedule);
    }
}