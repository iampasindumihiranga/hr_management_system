package com.hrmanagement.department.service;

import com.hrmanagement.department.entity.Department;
import com.hrmanagement.department.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with ID: " + id
                        )
                );
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(
            Long id,
            Department departmentDetails) {

        Department department = getDepartmentById(id);

        department.setDepartmentName(
                departmentDetails.getDepartmentName()
        );

        department.setDescription(
                departmentDetails.getDescription()
        );

        department.setStatus(
                departmentDetails.getStatus()
        );

        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id);

        departmentRepository.delete(department);
    }
}