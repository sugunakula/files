package com.example.demo.LoanApplication.Controller;

import com.example.demo.LoanApplication.Model.LoanApplication;
import com.example.demo.LoanApplication.Repository.LoanApplicationRepository;
import com.example.demo.LoanApplication.Service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/loan-applications")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService service;

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @GetMapping("/checkloans")
    public List<LoanApplication> getApplicationStatus(@RequestParam("customer_id") Long customerId) {
        return loanApplicationRepository.findByCustomerId(customerId);
    }

    @PostMapping("/apply")
    public LoanApplication applyForLoan(@RequestBody LoanApplication request) {
        System.out.println("hello");
        System.out.println("KYC: " + request);
        return service.applyForLoan(request.getCustomerId(), request.getLoan_product_id(), request);
    }




    @GetMapping("/all")
    public List<LoanApplication> getAllLoanApplications() {
        System.out.println("fxfhxhff");
        return loanApplicationRepository.findAll();
    }


    @GetMapping("/loanscount")
    public ResponseEntity<Long> loansCount() {
        System.out.println("byebyebye");
        long approvedCount = service.getApprovedLoansCount();
        System.out.println(approvedCount);
        return ResponseEntity.ok(approvedCount);
    }



    @PostMapping("/{applicationId}/decision")
    public ResponseEntity<String> updateLoanDecision(
            @PathVariable Long applicationId,
            @RequestBody Map<String, Boolean> decisionMap) {

        Boolean approved = decisionMap.get("approved");

        if (approved == null) {
            return ResponseEntity.badRequest().body("Missing 'approved' field in request body.");
        }

        Optional<LoanApplication> optionalApplication = loanApplicationRepository.findById(applicationId);

        if (optionalApplication.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LoanApplication application = optionalApplication.get();
        application.setApproval_Status(
                approved ? LoanApplication.ApprovalStatus.APPROVED : LoanApplication.ApprovalStatus.REJECTED
        );

        loanApplicationRepository.save(application);

        return ResponseEntity.ok("Application " + (approved ? "approved" : "rejected") + " successfully.");
    }

}
