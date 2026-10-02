package com.hrmanagement.employeetype.controller;

import com.hrmanagement.employeetype.entity.EmployeeType;
import com.hrmanagement.employeetype.service.EmployeeTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-types")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeTypeController {

    private final EmployeeTypeService employeeTypeService;

    public EmployeeTypeController(EmployeeTypeService employeeTypeService) {
        this.employeeTypeService = employeeTypeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeType>> getAllEmployeeTypes() {

        return ResponseEntity.ok(
                employeeTypeService.getAllEmployeeTypes()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeType> getEmployeeTypeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeTypeService.getEmployeeTypeById(id)
        );
    }

    @PostMapping
    public ResponseEntity<EmployeeType> createEmployeeType(
            @RequestBody EmployeeType employeeType) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employeeTypeService.createEmployeeType(employeeType));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeType> updateEmployeeType(
            @PathVariable Long id,
            @RequestBody EmployeeType employeeType) {

        return ResponseEntity.ok(
                employeeTypeService.updateEmployeeType(
                        id,
                        employeeType
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeType(
            @PathVariable Long id) {

        employeeTypeService.deleteEmployeeType(id);

        return ResponseEntity.noContent().build();
    }
}