package com.example.demo.Admin;

import com.example.demo.Admin.AdminController;
import com.example.demo.Admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/auth/admin")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

}