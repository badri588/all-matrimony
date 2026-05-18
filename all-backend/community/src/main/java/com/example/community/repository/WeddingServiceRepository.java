package com.example.community.repository;

 
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.community.entity.WeddingService;

public interface WeddingServiceRepository extends JpaRepository<WeddingService, String> {
}
