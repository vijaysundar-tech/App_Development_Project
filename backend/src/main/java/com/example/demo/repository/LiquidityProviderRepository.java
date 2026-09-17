package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.LiquidityProvider;

@Repository
public interface LiquidityProviderRepository extends JpaRepository<LiquidityProvider,Long>{
    
}
