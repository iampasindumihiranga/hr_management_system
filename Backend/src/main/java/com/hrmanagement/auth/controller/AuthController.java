package com.hrmanagement.auth.controller;

import com.hrmanagement.auth.entity.UserAccount;
import com.hrmanagement.auth.service.UserAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserAccountService userAccountService;

    public AuthController(
            UserAccountService userAccountService) {

        this.userAccountService = userAccountService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> register(
            @RequestBody UserAccount user) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        userAccountService.createUser(user)
                );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UserAccount loginRequest) {

        boolean valid =
                userAccountService.validateLogin(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                );

        if (!valid) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok(
                userAccountService
                        .findByUsername(
                                loginRequest.getUsername()
                        )
                        .orElseThrow()
        );
    }
}