package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.RecipientAccount;
import com.example.demo.repository.RecipientAccountRepository;

@Service
public class RecipientAccountService {
    @Autowired
    public RecipientAccountRepository repo;
    
    public List<RecipientAccount> getOperatorAccounts(Long userId)
    {
        List<RecipientAccount> a = repo.findByUserId(userId);
        return a;
    }

    public RecipientAccount regiterAccount(RecipientAccount account)
    {
        return repo.save(account);
    }

    public void archiveAccount(Long id)
    {
        repo.deleteById(id);
    }
}
