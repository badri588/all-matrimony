package com.example.community.entity;

 
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "service_requests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private ServiceCustomer customer;

    @Column(name = "service_id", length = 50)
    private String serviceId;

    @Column(name = "service_title", nullable = false, length = 150)
    private String serviceTitle;

    @Column(length = 80)
    private String category;

    @Column(length = 150)
    private String location;

    @Column(length = 80)
    private String price;

    @Column(name = "booking_date", length = 20)
    private String bookingDate;

    @Column(name = "booking_end_date", length = 20)
    private String bookingEndDate;

    @Column(name = "booking_time", length = 20)
    private String bookingTime;

    @Column(length = 30)
    private String status;

    @Column(name = "admin_message", length = 500)
    private String adminMessage;

    @Column(name = "requested_at")
    private LocalDateTime requestedAt;

    @Column(name = "status_updated_at")
    private LocalDateTime statusUpdatedAt;

    public ServiceRequest() {
    }

    @PrePersist
    public void onCreate() {
        this.requestedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    public Long getId() {
        return id;
    }

    public ServiceCustomer getCustomer() {
        return customer;
    }

    public String getServiceId() {
        return serviceId;
    }

    public String getServiceTitle() {
        return serviceTitle;
    }

    public String getCategory() {
        return category;
    }

    public String getLocation() {
        return location;
    }

    public String getPrice() {
        return price;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getBookingEndDate() {
        return bookingEndDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public String getStatus() {
        return status;
    }

    public String getAdminMessage() {
        return adminMessage;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }

    public LocalDateTime getStatusUpdatedAt() {
        return statusUpdatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCustomer(ServiceCustomer customer) {
        this.customer = customer;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public void setServiceTitle(String serviceTitle) {
        this.serviceTitle = serviceTitle;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setBookingEndDate(String bookingEndDate) {
        this.bookingEndDate = bookingEndDate;
    }

    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAdminMessage(String adminMessage) {
        this.adminMessage = adminMessage;
    }

    public void setRequestedAt(LocalDateTime requestedAt) {
        this.requestedAt = requestedAt;
    }

    public void setStatusUpdatedAt(LocalDateTime statusUpdatedAt) {
        this.statusUpdatedAt = statusUpdatedAt;
    }
}
