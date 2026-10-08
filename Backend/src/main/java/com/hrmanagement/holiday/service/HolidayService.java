package com.hrmanagement.holiday.service;

import com.hrmanagement.holiday.entity.Holiday;
import com.hrmanagement.holiday.Repository.HolidayRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public HolidayService(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public Holiday getHolidayById(Long id) {
        return holidayRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Holiday not found with ID: " + id
                        )
                );
    }

    public List<Holiday> getHolidaysBetween(
            LocalDate startDate,
            LocalDate endDate) {

        return holidayRepository.findByHolidayDateBetween(
                startDate,
                endDate
        );
    }

    public Holiday createHoliday(Holiday holiday) {

        if (holidayRepository.existsByHolidayDate(
                holiday.getHolidayDate())) {

            throw new RuntimeException(
                    "A holiday already exists on this date."
            );
        }

        return holidayRepository.save(holiday);
    }

    public Holiday updateHoliday(
            Long id,
            Holiday details) {

        Holiday holiday = getHolidayById(id);

        holiday.setHolidayName(details.getHolidayName());
        holiday.setHolidayDate(details.getHolidayDate());
        holiday.setHolidayType(details.getHolidayType());
        holiday.setDescription(details.getDescription());
        holiday.setStatus(details.getStatus());

        return holidayRepository.save(holiday);
    }

    public void deleteHoliday(Long id) {

        Holiday holiday = getHolidayById(id);

        holidayRepository.delete(holiday);
    }
}