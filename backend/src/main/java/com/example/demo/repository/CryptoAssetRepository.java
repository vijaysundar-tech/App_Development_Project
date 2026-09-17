package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.CryptoAsset;

@Repository
public interface CryptoAssetRepository extends JpaRepository<CryptoAsset,Long>{
    
}
