package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.RecipientAccount;

@Repository
public interface RecipientAccountRepository extends JpaRepository<RecipientAccount,Long>{
    List<RecipientAccount> findByUserId(Long userId);
}
