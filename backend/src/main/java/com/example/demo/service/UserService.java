package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public User createUser(User user) {

        
        if (!user.getRole().equals("ROLE_ADMIN") &&
            !user.getRole().equals("ROLE_TRADER")) {

            throw new RuntimeException("Invalid role. Only ROLE_ADMIN and ROLE_TRADER are allowed.");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // Get User By Id
    public User getUserById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update User
    public User updateUser(User user) {

        if (!repo.existsById(user.getId())) {
            throw new RuntimeException("User not found");
        }

        // Validate role
        if (!user.getRole().equals("ROLE_ADMIN") &&
            !user.getRole().equals("ROLE_TRADER")) {

            throw new RuntimeException("Invalid role. Only ROLE_ADMIN and ROLE_TRADER are allowed.");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }

    // Delete User
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}