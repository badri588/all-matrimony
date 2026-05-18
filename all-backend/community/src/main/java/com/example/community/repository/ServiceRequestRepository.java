package com.example.community.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.community.entity.ServiceRequest;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findAllByOrderByRequestedAtDesc();

    List<ServiceRequest> findByCustomerUserKeyOrderByRequestedAtDesc(String userKey);
}
