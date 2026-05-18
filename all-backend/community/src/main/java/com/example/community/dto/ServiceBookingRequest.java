package com.example.community.dto;

 
import jakarta.validation.constraints.NotBlank;

public record ServiceBookingRequest(

        @NotBlank(message = "userKey is required")
        String userKey,

        String serviceId,

        @NotBlank(message = "title is required")
        String title,

        String category,

        String location,

        String price,

        String bookingDate,

        String bookingEndDate,

        String bookingTime
) {
}
