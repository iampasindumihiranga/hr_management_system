package com.hrmanagement.auth.service;

import com.hrmanagement.auth.entity.UserAccount;
import com.hrmanagement.auth.Repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccountService(
            UserAccountRepository userAccountRepository) {

        this.userAccountRepository = userAccountRepository;
    }

    public UserAccount createUser(UserAccount user) {

        if (userAccountRepository
                .existsByUsername(user.getUsername())) {

            throw new RuntimeException(
                    "Username already exists."
            );
        }

        if (user.getStatus() == null) {
            user.setStatus("ACTIVE");
        }

        return userAccountRepository.save(user);
    }

    public Optional<UserAccount> findByUsername(
            String username) {

        return userAccountRepository
                .findByUsername(username);
    }

    public boolean validateLogin(
            String username,
            String password) {

        Optional<UserAccount> user =
                userAccountRepository
                        .findByUsername(username);

        if (user.isEmpty()) {
            return false;
        }

        UserAccount account = user.get();

        return account.getPassword().equals(password)
                && "ACTIVE".equalsIgnoreCase(
                        account.getStatus()
                );
    }
}