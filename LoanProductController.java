package com.example.demo.LoanProduct.Controller;
import com.example.demo.LoanProduct.Entity.LoanProduct;
import com.example.demo.LoanProduct.Service.LoanProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan-products")
public class LoanProductController {

    @Autowired
    private LoanProductService service;

    @PostMapping("/add")
    public LoanProduct addLoanProduct(@RequestBody LoanProduct product) {
        return service.addLoanProduct(product);
    }

    @PutMapping("/{id}")
    public LoanProduct updateLoanProduct(@PathVariable int id, @RequestBody LoanProduct product) {
        return service.updateLoanProduct(id, product);
    }

    @GetMapping("/{id}")
    public LoanProduct getLoanProductDetails(@PathVariable int id) {
        return service.getLoanProductDetails(id);
    }
}
