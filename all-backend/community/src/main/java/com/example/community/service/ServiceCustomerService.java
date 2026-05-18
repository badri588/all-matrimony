package com.example.community.service;

 
import org.springframework.stereotype.Service;

import com.example.community.dto.CustomerRegisterRequest;
import com.example.community.dto.CustomerStatusResponse;
import com.example.community.entity.ServiceCustomer;
import com.example.community.repository.ServiceCustomerRepository;

@Service
public class ServiceCustomerService {

    private final ServiceCustomerRepository customerRepository;

    public ServiceCustomerService(ServiceCustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerStatusResponse checkStatus(String userKey) {
        return customerRepository.findByUserKey(userKey)
                .map(customer -> new CustomerStatusResponse(
                        true,
                        customer.isServiceApproved(),
                        customer.getId(),
                        customer.getFullName(),
                        customer.getPhone(),
                        "Customer already registered"
                ))
                .orElse(new CustomerStatusResponse(
                        false,
                        false,
                        null,
                        null,
                        null,
                        "Customer registration required"
                ));
    }

    public CustomerStatusResponse registerCustomer(CustomerRegisterRequest request) {
        if (customerRepository.existsByUserKey(request.userKey())) {
            ServiceCustomer existing = customerRepository.findByUserKey(request.userKey()).orElseThrow();

            return new CustomerStatusResponse(
                    true,
                    existing.isServiceApproved(),
                    existing.getId(),
                    existing.getFullName(),
                    existing.getPhone(),
                    "Customer already registered"
            );
        }

        if (customerRepository.existsByPhone(request.phone())) {
            throw new RuntimeException("This phone number is already registered");
        }

        ServiceCustomer customer = new ServiceCustomer();
        customer.setUserKey(request.userKey());
        customer.setFullName(request.fullName());
        customer.setPhone(request.phone());
        customer.setEmail(request.email());
        customer.setAddress(request.address());
        customer.setCity(request.city());

        ServiceCustomer saved = customerRepository.save(customer);

        return new CustomerStatusResponse(
                true,
                saved.isServiceApproved(),
                saved.getId(),
                saved.getFullName(),
                saved.getPhone(),
                "Customer registered successfully"
        );
    }
}
