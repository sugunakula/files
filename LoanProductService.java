package com.example.demo.LoanProduct.Service;
import com.example.demo.LoanProduct.Entity.LoanProduct;
import com.example.demo.LoanProduct.Repository.LoanProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoanProductService {

    @Autowired
    private LoanProductRepository repository;

    public LoanProduct addLoanProduct(LoanProduct product) {
        return repository.save(product);
    }

    public LoanProduct updateLoanProduct(int id, LoanProduct updatedProduct) {
        Optional<LoanProduct> optionalProduct = repository.findById(id);
        if (optionalProduct.isPresent()) {
            LoanProduct existing = optionalProduct.get();
            existing.setProductName(updatedProduct.getProductName());
            existing.setInterestRate(updatedProduct.getInterestRate());
            existing.setMinAmount(updatedProduct.getMinAmount());
            existing.setMaxAmount(updatedProduct.getMaxAmount());
            existing.setTenure(updatedProduct.getTenure());
            return repository.save(existing);
        }
        return null;
    }

    public LoanProduct getLoanProductDetails(int id) {
        return repository.findById(id).orElse(null);
    }
}

