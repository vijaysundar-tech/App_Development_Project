package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.UserWallet;
import com.example.demo.repository.UserWalletRepository;

@Service
public class UserWalletService {
    @Autowired
    public UserWalletRepository repo;

    public List<UserWallet> getLinkedWallets(Long userId)
    {
        List<UserWallet> a = repo.findByUserId(userId);
        return a;
    }

    public UserWallet linkWallet(UserWallet wallet)
    {
        return repo.save(wallet);
    }

    public void unlinkWallet(Long id)
    {
        repo.deleteById(id);
    }
}
