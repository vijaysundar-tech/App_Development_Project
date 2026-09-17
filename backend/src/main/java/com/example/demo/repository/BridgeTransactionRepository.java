package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.BridgeTransaction;

@Repository
public interface BridgeTransactionRepository extends JpaRepository<BridgeTransaction,Long>{
    Optional<BridgeTransaction> findByTransactionReference(String transactionReference);
}
