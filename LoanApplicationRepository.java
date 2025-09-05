package com.example.demo.LoanApplication.Repository;

import com.example.demo.LoanApplication.Model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomerId(Long customerId);

    @Query("SELECT COUNT(l) FROM LoanApplication l WHERE l.approval_Status = :status")
    long countApprovedLoansByStatus(LoanApplication.ApprovalStatus status);

}



