package com.hrmanagement.employeetype.service;

import com.hrmanagement.employeetype.entity.EmployeeType;
import com.hrmanagement.employeetype.repository.EmployeeTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeTypeService {

    private final EmployeeTypeRepository employeeTypeRepository;

    public EmployeeTypeService(EmployeeTypeRepository employeeTypeRepository) {
        this.employeeTypeRepository = employeeTypeRepository;
    }

    public List<EmployeeType> getAllEmployeeTypes() {
        return employeeTypeRepository.findAll();
    }

    public EmployeeType getEmployeeTypeById(Long id) {
        return employeeTypeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee type not found with ID: " + id
                        )
                );
    }

    public EmployeeType createEmployeeType(EmployeeType employeeType) {
        return employeeTypeRepository.save(employeeType);
    }

    public EmployeeType updateEmployeeType(
            Long id,
            EmployeeType employeeTypeDetails) {

        EmployeeType employeeType = getEmployeeTypeById(id);

        employeeType.setTypeName(employeeTypeDetails.getTypeName());
        employeeType.setDescription(employeeTypeDetails.getDescription());
        employeeType.setStatus(employeeTypeDetails.getStatus());

        return employeeTypeRepository.save(employeeType);
    }

    public void deleteEmployeeType(Long id) {
        EmployeeType employeeType = getEmployeeTypeById(id);

        employeeTypeRepository.delete(employeeType);
    }
}