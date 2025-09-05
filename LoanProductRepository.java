package com.example.demo.LoanProduct.Repository;

import com.example.demo.LoanProduct.Entity.LoanProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanProductRepository extends JpaRepository<LoanProduct, Integer> {
}

