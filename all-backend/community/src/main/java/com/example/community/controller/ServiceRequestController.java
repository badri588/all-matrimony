package com.example.community.controller;

 
import com.example.community.dto.ServiceBookingRequest;
import com.example.community.dto.ServiceBookingResponse;
import com.example.community.entity.ServiceRequest;
import com.example.community.repository.ServiceRequestRepository;
import com.example.community.service.WeddingServiceBookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final WeddingServiceBookingService bookingService;
    private final ServiceRequestRepository serviceRequestRepository;

    public ServiceRequestController(
            WeddingServiceBookingService bookingService,
            ServiceRequestRepository serviceRequestRepository
    ) {
        this.bookingService = bookingService;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    @PostMapping("/send")
    public ServiceBookingResponse sendServiceRequest(
            @Valid @RequestBody ServiceBookingRequest request
    ) {
        return bookingService.sendBookingRequest(request);
    }

    @GetMapping
    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAllByOrderByRequestedAtDesc();
    }

    @GetMapping("/my-requests")
    public List<ServiceRequest> getMyRequests(@RequestParam String userKey) {
        return serviceRequestRepository.findByCustomerUserKeyOrderByRequestedAtDesc(userKey);
    }

    @PatchMapping("/{requestId}/status")
    public ServiceRequest updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam String status,
            @RequestParam(required = false) String adminMessage
    ) {
        return bookingService.updateRequestStatus(requestId, status, adminMessage);
    }
}
