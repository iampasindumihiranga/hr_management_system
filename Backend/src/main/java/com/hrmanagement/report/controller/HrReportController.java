package com.hrmanagement.report.controller;

import com.hrmanagement.report.dto.HrDashboardResponse;
import com.hrmanagement.report.service.HrReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class HrReportController {

    private final HrReportService hrReportService;

    public HrReportController(
            HrReportService hrReportService) {

        this.hrReportService = hrReportService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<HrDashboardResponse>
    getDashboardSummary() {

        return ResponseEntity.ok(
                hrReportService.getDashboardSummary()
        );
    }
}