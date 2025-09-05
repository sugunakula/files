package com.example.demo.Customer.Repository;

import com.example.demo.Customer.Model.Customer;
import com.example.demo.Customer.Model.KycStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUsername(String username);
    Optional<Customer> findByEmail(String email);
    List<Customer> findByKycStatus(KycStatus kycStatus);

    List<Customer> findByNameContainingIgnoreCase(String name);


}
