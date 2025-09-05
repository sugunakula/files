package com.example.demo.Customer.Controller;

import com.example.demo.Customer.Model.Customer;
import com.example.demo.Customer.Model.KycStatus;
import com.example.demo.Customer.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@CrossOrigin(origins = "http://localhost:8081")


@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping("/register")
    public Customer registerCustomer(@RequestBody Customer customer) {
//        Customer(customer);
        return service.saveCustomer(customer);
    }

    // ✅ New endpoint to send entire customer table
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }


    @GetMapping("/pending-kyc")
    public List<Customer> getPendingKycCustomers() {
        return service.getCustomersByKycStatus(KycStatus.PENDING);
    }


    @GetMapping("/find1/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return service.getCustomerById(id);
    }

    @PutMapping("/find")
    public ResponseEntity<?> getCustomerByEmail(@RequestBody Map<String, String> payload) {
        String email = payload.get("email").trim();
        try {
            Customer customer = service.getCustomerByEmail(email);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "Customer not found for email: " + email));
        }
    }

    @PutMapping("/updatekyc/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        return service.updateCustomer(id, updatedCustomer);
    }

    @PostMapping("/{id}/kyc-status")
    public ResponseEntity<String> updateKycStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        System.out.println("DFGHJKKJHGFGJKJHGFGHJGFDFGJHG");
        String status = payload.get("status");

        System.out.println("Received status: " + status);


        if (status == null || (!status.equalsIgnoreCase("VERIFIED") && !status.equalsIgnoreCase("REJECTED"))) {
            return ResponseEntity.badRequest().body("Invalid status. Must be 'APPROVED' or 'REJECTED'.");
        }


        try {
            Customer customer = service.getCustomerById(id);
            customer.setKycStatus(KycStatus.valueOf(status.toUpperCase()));
            service.saveCustomer(customer);
            return ResponseEntity.ok("KYC status updated to " + status);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Customer not found or update failed.");
        }
    }


    // Optional: Uncomment if you want to support KYC verification/reset
    /*
    @PutMapping("/{id}/kyc/verify")
    public Customer verifyKyc(@PathVariable Long id) {
        return service.verifyKyc(id);
    }

    @PutMapping("/{id}/kyc/reset")
    public Customer resetKyc(@PathVariable Long id) {
        return service.resetKyc(id);
    }
    */
}
