package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserWallet;

@Repository
public interface UserWalletRepository extends JpaRepository<UserWallet,Long>{
    List<UserWallet> findByUserId(Long userId);
}
