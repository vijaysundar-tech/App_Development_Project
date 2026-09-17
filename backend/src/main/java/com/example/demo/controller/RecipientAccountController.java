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

import com.example.demo.model.RecipientAccount;
import com.example.demo.service.RecipientAccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class RecipientAccountController {
    
    @Autowired
    public RecipientAccountService accountService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecipientAccount>> listAccountsForOperator(@PathVariable Long userId)
    {
        List<RecipientAccount> a = accountService.getOperatorAccounts(userId);
        return ResponseEntity.status(200).body(a);
    }

    @PostMapping()
    public ResponseEntity<RecipientAccount> regiterAccount(@Valid @RequestBody RecipientAccount account)
    {
        RecipientAccount a = accountService.regiterAccount(account);
        return ResponseEntity.status(201).body(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipientAccount> updateAccount(@PathVariable Long id,@RequestBody RecipientAccount account)
    {
        account.setId(id);
        RecipientAccount a = accountService.regiterAccount(account);
        return ResponseEntity.status(200).body(a);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> archiveAccount(@PathVariable Long id)
    {
        accountService.archiveAccount(id);
        return ResponseEntity.status(200).body("RecipientAccount delelted successfully");
    } 
}