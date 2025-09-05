package com.example.demo.LoanApplication.Service;

import com.example.demo.Customer.Model.Customer;
import com.example.demo.Customer.Repository.CustomerRepository;
import com.example.demo.LoanApplication.Model.LoanApplication;
import com.example.demo.LoanApplication.Repository.LoanApplicationRepository;
import com.example.demo.LoanProduct.Entity.LoanProduct;
import com.example.demo.LoanProduct.Repository.LoanProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private LoanProductRepository productRepo;

    public LoanApplication applyForLoan(Long customerId, Long productId, LoanApplication request) {
        System.out.println("BYE: " + request);

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        request.setCustomerId(customerId); // Optional, already set by frontend
        request.setApplication_date(LocalDate.now());
        request.setApproval_Status(LoanApplication.ApprovalStatus.PENDING);

        return loanRepo.save(request);
    }



    public long getApprovedLoansCount() {
        return loanRepo.countApprovedLoansByStatus(LoanApplication.ApprovalStatus.APPROVED);
    }




//
//    public List<LoanApplication> findByCustomerId(Long customerId) {
//        return loanRepo.getCustomer_id(customerId);
//    }

//    public LoanApplication getApplicationStatus(Long applicationId) {
//        return loanRepo.findById(applicationId).orElseThrow();
//    }

//    public LoanApplication processLoanApplication(Long applicationId, String decision) {
//        LoanApplication application = loanRepo.findById(applicationId).orElseThrow();
//
//        if ("APPROVE".equalsIgnoreCase(decision)) {
//            application.setApprovalStatus(LoanApplication.ApprovalStatus.APPROVED);
//        } else if ("REJECT".equalsIgnoreCase(decision)) {
//            application.setApprovalStatus(LoanApplication.ApprovalStatus.REJECTED);
//        } else {
//            throw new IllegalArgumentException("Invalid decision");
//        }
//
//        return loanRepo.save(application);
//    }
}
