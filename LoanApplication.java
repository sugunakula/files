package com.example.demo.LoanApplication.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "LoanApplication")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long application_id;


    @Column(name = "customer_id") // maps to DB column
    private Long customerId;

    @Column(nullable = true)
    private Long loan_product_id; // ✅ Changed from LoanProduct to Long to fix Hibernate error

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal loan_amount;

    private int loanInterest;
    private int tenure;
    private long monthlyEmi;

    @Column(nullable = false)
    private LocalDate application_date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus approval_Status;

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }
}
