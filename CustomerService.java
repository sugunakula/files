//package com.example.demo.Customer.Service;
//
//import com.example.demo.Customer.Model.Customer;
//import com.example.demo.Customer.Model.KycStatus;
//import com.example.demo.Customer.Repository.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class CustomerService {
//
//    private final CustomerRepository repository;
//
//    @Autowired
//    public CustomerService(CustomerRepository repository) {
//        this.repository = repository;
//    }
//
//    public Customer saveCustomer(Customer customer) {
//
//        return repository.save(customer);
//    }
//
//    public List<Customer> getAllCustomers() {
//        return repository.findAll();
//    }
//
//    public Customer getCustomerById(Long customerId) {
//        return repository.findById(customerId).orElse(null);
//    }
//
//    public Customer getCustomerByUsername(String username) {
//        return repository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//    }
//
//    public Customer getCustomerByEmail(String email) {
////        System.out.println("ggggggg"+email);
////        System.out.println("bye"+repository.findByEmail(email));
//        return repository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//    }
//
//    public Customer updateCustomer(Long customerId, Customer updatedCustomer) {
//        Optional<Customer> optionalCustomer = repository.findById(customerId);
//        if (optionalCustomer.isPresent()) {
//            Customer existingCustomer = optionalCustomer.get();
//            existingCustomer.setName(updatedCustomer.getName());
//            existingCustomer.setEmail(updatedCustomer.getEmail());
//            existingCustomer.setPhone(updatedCustomer.getPhone());
//            existingCustomer.setAddress(updatedCustomer.getAddress());
//            existingCustomer.setKycStatus(updatedCustomer.getKycStatus());
//            existingCustomer.setUsername(updatedCustomer.getUsername());
//            existingCustomer.setPan_number(updatedCustomer.getPan_number());
//            existingCustomer.setAdhar_number(updatedCustomer.getAdhar_number());
//            return repository.save(existingCustomer);
//        } else {
//            return null;
//        }
//    }
//
//    public Customer verifyKyc(Long customerId) {
//        Optional<Customer> optionalCustomer = repository.findById(customerId);
//        if (optionalCustomer.isPresent()) {
//            Customer customer = optionalCustomer.get();
//            customer.setKycStatus(KycStatus.VERIFIED);
//            return repository.save(customer);
//        } else {
//            return null;
//        }
//    }
//
//    public Customer resetKyc(Long customerId) {
//        Optional<Customer> optionalCustomer = repository.findById(customerId);
//        if (optionalCustomer.isPresent()) {
//            Customer customer = optionalCustomer.get();
//            customer.setKycStatus(KycStatus.PENDING);
//            return repository.save(customer);
//        } else {
//            return null;
//        }
//    }
//}

package com.example.demo.Customer.Service;

import com.example.demo.Customer.Model.Customer;
import com.example.demo.Customer.Model.KycStatus;
import com.example.demo.Customer.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer saveCustomer(Customer customer) {
        Optional<Customer> existingCustomerOpt = repository.findByEmail(customer.getEmail());
        if (existingCustomerOpt.isPresent()) {
            Customer existingCustomer = existingCustomerOpt.get();
            existingCustomer.setName(customer.getName());
            existingCustomer.setPhone(customer.getPhone());
            existingCustomer.setUsername(customer.getUsername());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPan_number(customer.getPan_number());
            existingCustomer.setAdhar_number(customer.getAdhar_number());
            existingCustomer.setKycStatus(customer.getKycStatus());
            return repository.save(existingCustomer);
        } else {
            return repository.save(customer);
        }
    }



    public List<Customer> getCustomersByKycStatus(KycStatus status) {
        return repository.findByKycStatus(status);
    }

    public List<Customer> searchCustomersByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }


    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return repository.findById(customerId).orElse(null);
    }

    public Customer getCustomerByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer getCustomerByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer updateCustomer(Long customerId, Customer updatedCustomer) {
        Optional<Customer> optionalCustomer = repository.findById(customerId);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            existingCustomer.setName(updatedCustomer.getName());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            existingCustomer.setPhone(updatedCustomer.getPhone());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setKycStatus(updatedCustomer.getKycStatus());
            existingCustomer.setUsername(updatedCustomer.getUsername());
            existingCustomer.setPan_number(updatedCustomer.getPan_number());
            existingCustomer.setAdhar_number(updatedCustomer.getAdhar_number());
            return repository.save(existingCustomer);
        } else {
            return null;
        }
    }

    public Customer verifyKyc(Long customerId) {
        Optional<Customer> optionalCustomer = repository.findById(customerId);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setKycStatus(KycStatus.VERIFIED);
            return repository.save(customer);
        } else {
            return null;
        }
    }

    public Customer resetKyc(Long customerId) {
        Optional<Customer> optionalCustomer = repository.findById(customerId);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setKycStatus(KycStatus.PENDING);
            return repository.save(customer);
        } else {
            return null;
        }
    }
}

