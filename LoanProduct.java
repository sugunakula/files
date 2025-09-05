package com.example.demo.LoanProduct.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="LoanProduct")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoanProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loanProductId;
    private String productName;
    private double interestRate;
    private double minAmount;
    private double maxAmount;
    private int tenure;
}
