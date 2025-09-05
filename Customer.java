package com.example.demo.Customer.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    private String name;
    private String email;
    private String phone;
    private String username;
    private String pan_number; // Added PAN number column
    private String adhar_number; // Added Aadhaar number column
    @Column(columnDefinition = "Text")
    private String address;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;
}
