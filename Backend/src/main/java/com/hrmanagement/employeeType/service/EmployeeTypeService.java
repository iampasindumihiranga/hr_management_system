package com.hrmanagement.employeeType.service;

import com.hrmanagement.employeeType.repository.EmployeeTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeTypeService {

    private final EmployeeTypeRepository employeeTypeRepository;

    public EmployeeTypeService(EmployeeTypeRepository employeeTypeRepository) {
        this.employeeTypeRepository = employeeTypeRepository;
    }

    public List<com.hrmanagement.employeeType.entity.EmployeeType> getAllEmployeeTypes() {
        return employeeTypeRepository.findAll();
    }

    public com.hrmanagement.employeeType.entity.EmployeeType getEmployeeTypeById(Long id) {
        return employeeTypeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee type not found with ID: " + id
                        )
                );
    }

    public com.hrmanagement.employeeType.entity.EmployeeType createEmployeeType(
            com.hrmanagement.employeeType.entity.EmployeeType employeeType) {
        return employeeTypeRepository.save(employeeType);
    }

    public com.hrmanagement.employeeType.entity.EmployeeType updateEmployeeType(
            Long id,
            com.hrmanagement.employeeType.entity.EmployeeType employeeTypeDetails) {

        com.hrmanagement.employeeType.entity.EmployeeType employeeType = getEmployeeTypeById(id);

        employeeType.setTypeName(employeeTypeDetails.getTypeName());
        employeeType.setDescription(employeeTypeDetails.getDescription());
        employeeType.setStatus(employeeTypeDetails.getStatus());

        return employeeTypeRepository.save(employeeType);
    }

    public void deleteEmployeeType(Long id) {
        com.hrmanagement.employeeType.entity.EmployeeType employeeType = getEmployeeTypeById(id);

        employeeTypeRepository.delete(employeeType);
    }
}