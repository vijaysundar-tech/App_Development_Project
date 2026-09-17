package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserWallet;
import com.example.demo.service.UserWalletService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/wallets")
public class UserWalletController {

    @Autowired
    public UserWalletService service;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserWallet>> getLinkedWallet(@PathVariable Long userId)
    {
        List<UserWallet> a = service.getLinkedWallets(userId);
        return ResponseEntity.status(200).body(a);
    }

    @PostMapping()
    public ResponseEntity<UserWallet> linkWallet(@Valid @RequestBody UserWallet wallet)
    {
        UserWallet a = service.linkWallet(wallet);
        return ResponseEntity.status(201).body(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserWallet> updateUserWallet(
            @PathVariable Long id,
            @Valid @RequestBody UserWallet wallet) {

        wallet.setId(id);

        UserWallet updated = service.linkWallet(wallet);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> unlinkWallet(@PathVariable Long id)
    {
        service.unlinkWallet(id);
        return ResponseEntity.status(200).body("UserWallet deleted successfully");
    }
}