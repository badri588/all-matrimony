package com.example.community.repository;

 
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.community.entity.ServiceCustomer;

public interface ServiceCustomerRepository extends JpaRepository<ServiceCustomer, Long> {

    Optional<ServiceCustomer> findByUserKey(String userKey);

    boolean existsByUserKey(String userKey);

    boolean existsByPhone(String phone);
}
