package com.example.demo.controller;

import com.example.demo.Admin.Admin;
import com.example.demo.Admin.AdminRepository;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081") // Allow frontend access
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody User user) {
        // Find user by email
        System.out.println(user.getEmail());
        System.out.println("hihihihihihihi");
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found"));
        }

        // Verify favouriteSport
        if (!existingUser.getFavouriteSport().equalsIgnoreCase(user.getFavouriteSport())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Security answer does not match"));
        }

        // Update password
        existingUser.setPassword(user.getPassword());
        userRepository.save(existingUser);

        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("message", "Username already exists"));
        }
        userRepository.save(user);
        // Auto-login after successful registration
        return signIn(user);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> count() {
        long userCount = userRepository.count();
        List<User> users = userRepository.findAll(); // Assuming your entity is named `User`
        System.out.println(users);
        Map<String, Object> response = Map.of(
                "count", userCount,
                "users", users
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        System.out.println(user.getEmail());
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(Map.of("user", existingUser, "message", "Login successful"));
        }
        Admin existingAdmin = adminRepository.findByEmail(user.getEmail());
        if (existingAdmin != null && existingAdmin.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(Map.of("admin", existingAdmin, "message", "Login successful admin"));
        }
        return null;

    }

}
