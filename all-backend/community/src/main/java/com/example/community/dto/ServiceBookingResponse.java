package com.example.community.dto;

 
public record ServiceBookingResponse(
        boolean registered,
        boolean requestCreated,
        Long requestId,
        String status,
        boolean directConfirmed,
        String message
) {
}
