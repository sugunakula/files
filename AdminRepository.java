package com.example.demo.Admin;

import com.example.demo.Admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,String> {
    Admin findByEmail(String email);
}
