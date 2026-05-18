package com.allmatrimony.backend.controller;

import com.allmatrimony.backend.dto.ApiResponse;
import com.allmatrimony.backend.dto.StatusUpdateRequest;
import com.allmatrimony.backend.service.MatrimonyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final MatrimonyService matrimonyService;

    public AdminController(MatrimonyService matrimonyService) {
        this.matrimonyService = matrimonyService;
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        return ResponseEntity.ok(matrimonyService.getAllUsers());
    }

    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse> getAdminNotifications() {
        return ResponseEntity.ok(matrimonyService.getAdminNotifications());
    }

    @GetMapping("/approval-requests")
    public ResponseEntity<ApiResponse> getApprovalRequests() {
        return ResponseEntity.ok(matrimonyService.getApprovalRequests());
    }

    @PostMapping("/approval-requests/{requestId}/approve")
    public ResponseEntity<ApiResponse> approveProfile(
            @PathVariable Long requestId,
            @RequestBody(required = false) StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(matrimonyService.approveProfile(
                requestId,
                request == null ? new StatusUpdateRequest() : request
        ));
    }

    @PostMapping("/approval-requests/{requestId}/reject")
    public ResponseEntity<ApiResponse> rejectProfile(
            @PathVariable Long requestId,
            @RequestBody(required = false) StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(matrimonyService.rejectProfile(
                requestId,
                request == null ? new StatusUpdateRequest() : request
        ));
    }

    @GetMapping("/verification-requests")
    public ResponseEntity<ApiResponse> getVerificationRequests() {
        return ResponseEntity.ok(matrimonyService.getVerificationRequests());
    }

    @PostMapping("/verification-requests/{requestId}/approve")
    public ResponseEntity<ApiResponse> approveVerification(
            @PathVariable Long requestId,
            @RequestBody(required = false) StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(matrimonyService.updateVerificationStatus(
                requestId,
                "Approved",
                request == null ? new StatusUpdateRequest() : request
        ));
    }

    @PostMapping("/verification-requests/{requestId}/reject")
    public ResponseEntity<ApiResponse> rejectVerification(
            @PathVariable Long requestId,
            @RequestBody(required = false) StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(matrimonyService.updateVerificationStatus(
                requestId,
                "Rejected",
                request == null ? new StatusUpdateRequest() : request
        ));
    }
}
