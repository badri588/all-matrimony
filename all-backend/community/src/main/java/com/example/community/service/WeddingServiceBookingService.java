package com.example.community.service;

 
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.community.dto.ServiceBookingRequest;
import com.example.community.dto.ServiceBookingResponse;
import com.example.community.entity.ServiceCustomer;
import com.example.community.entity.ServiceRequest;
import com.example.community.repository.ServiceCustomerRepository;
import com.example.community.repository.ServiceRequestRepository;

@Service
public class WeddingServiceBookingService {

    private final ServiceCustomerRepository customerRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public WeddingServiceBookingService(
            ServiceCustomerRepository customerRepository,
            ServiceRequestRepository serviceRequestRepository
    ) {
        this.customerRepository = customerRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public ServiceBookingResponse sendBookingRequest(ServiceBookingRequest request) {
        Optional<ServiceCustomer> customerOptional =
                customerRepository.findByUserKey(request.userKey());

        if (customerOptional.isEmpty()) {
            return new ServiceBookingResponse(
                    false,
                    false,
                    null,
                    null,
                    false,
                    "Registration required before sending service request"
            );
        }

        ServiceCustomer customer = customerOptional.get();
        boolean directConfirmed = customer.isServiceApproved();
        String status = directConfirmed ? "APPROVED" : "PENDING";

        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setCustomer(customer);
        serviceRequest.setServiceId(request.serviceId());
        serviceRequest.setServiceTitle(request.title());
        serviceRequest.setCategory(request.category());
        serviceRequest.setLocation(request.location());
        serviceRequest.setPrice(request.price());
        serviceRequest.setBookingDate(request.bookingDate());
        serviceRequest.setBookingEndDate(request.bookingEndDate());
        serviceRequest.setBookingTime(request.bookingTime());
        serviceRequest.setStatus(status);

        if (directConfirmed) {
            serviceRequest.setAdminMessage(buildDecisionMessage(serviceRequest, status, null));
            serviceRequest.setStatusUpdatedAt(LocalDateTime.now());
        }

        ServiceRequest saved = serviceRequestRepository.save(serviceRequest);

        return new ServiceBookingResponse(
                true,
                true,
                saved.getId(),
                saved.getStatus(),
                directConfirmed,
                directConfirmed
                        ? "Service booking confirmed successfully"
                        : "Service booking request sent successfully"
        );
    }

    public ServiceRequest updateRequestStatus(Long requestId, String status, String adminMessage) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));

        String normalizedStatus = status == null ? "" : status.trim().toUpperCase();

        if (!normalizedStatus.equals("APPROVED") && !normalizedStatus.equals("REJECTED")) {
            throw new RuntimeException("Status must be APPROVED or REJECTED");
        }

        request.setStatus(normalizedStatus);
        request.setAdminMessage(buildDecisionMessage(request, normalizedStatus, adminMessage));
        request.setStatusUpdatedAt(LocalDateTime.now());

        if (normalizedStatus.equals("APPROVED")) {
            ServiceCustomer customer = request.getCustomer();
            customer.setServiceApproved(true);
            customerRepository.save(customer);
        }

        return serviceRequestRepository.save(request);
    }

    private String buildDecisionMessage(ServiceRequest request, String status, String adminMessage) {
        if (adminMessage != null && !adminMessage.trim().isEmpty()) {
            return adminMessage.trim();
        }

        String serviceTitle = request.getServiceTitle() == null
                ? "Wedding Service"
                : request.getServiceTitle();

        if ("APPROVED".equals(status)) {
            return "Your " + serviceTitle + " booking request is approved. Vendor will contact you soon.";
        }

        return "Your " + serviceTitle + " booking request is rejected. Please contact support for details.";
    }
}
