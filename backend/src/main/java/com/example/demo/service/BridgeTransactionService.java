package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BridgeTransactionDTO;
import com.example.demo.model.BridgeTransaction;

import com.example.demo.repository.BridgeTransactionRepository;
import com.example.demo.repository.CryptoAssetRepository;
import com.example.demo.repository.RecipientAccountRepository;

@Service
public class BridgeTransactionService {

    @Autowired
    private BridgeTransactionRepository repo;

    @Autowired
    private CryptoAssetRepository assetRepo;

    @Autowired
    private RecipientAccountRepository accountRepo;

    // Fetch all transactions
    public List<BridgeTransactionDTO> getAllSettlements() {
        return repo.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Create transaction
    public BridgeTransactionDTO initiateSettlement(BridgeTransactionDTO dto) {

        BridgeTransaction entity = convertToEntity(dto);
        entity.setCreatedAt(LocalDateTime.now());

        String reference;

        do {
            reference = "BB-" + UUID.randomUUID();
        } while (repo.findByTransactionReference(reference).isPresent());

        entity.setTransactionReference(reference);

        // Example business logic
        if (entity.getFiatValue() == null) {
            entity.setFiatValue(entity.getCryptoAmount() * 85);
        }

        BridgeTransaction saved = repo.save(entity);

        return convertToDTO(saved);
    }

    // Update transaction
    public BridgeTransactionDTO saveSettlement(BridgeTransactionDTO dto) {

        BridgeTransaction saved = repo.save(convertToEntity(dto));

        return convertToDTO(saved);
    }

    // Delete transaction
    public void archiveSettlement(Long id) {
        repo.deleteById(id);
    }

    // DTO -> Entity
    private BridgeTransaction convertToEntity(BridgeTransactionDTO dto) {

        BridgeTransaction entity = new BridgeTransaction();

        entity.setId(dto.getId());
        entity.setTransactionReference(dto.getTransactionReference());
        entity.setCryptoAmount(dto.getCryptoAmount());
        entity.setFiatValue(dto.getFiatValue());
        entity.setNetworkFee(dto.getNetworkFee());
        entity.setBridgeStatus(dto.getBridgeStatus());
        entity.setCreatedAt(dto.getCreatedAt());

        if(dto.getAssetId() != null){
            entity.setAsset(assetRepo.findById(dto.getAssetId()).orElseThrow());
        }

        if(dto.getAccountId() != null){
            entity.setAccount(accountRepo.findById(dto.getAccountId()).orElseThrow());
        }

        return entity;
    }

    // Entity -> DTO
    private BridgeTransactionDTO convertToDTO(BridgeTransaction entity) {

        BridgeTransactionDTO dto = new BridgeTransactionDTO();

        dto.setId(entity.getId());
        dto.setTransactionReference(entity.getTransactionReference());
        dto.setCryptoAmount(entity.getCryptoAmount());
        dto.setFiatValue(entity.getFiatValue());
        dto.setNetworkFee(entity.getNetworkFee());
        dto.setBridgeStatus(entity.getBridgeStatus());
        dto.setCreatedAt(entity.getCreatedAt());

        if(entity.getAsset() != null){
            dto.setAssetId(entity.getAsset().getId());
        }

        if(entity.getAccount() != null){
            dto.setAccountId(entity.getAccount().getId());
        }

        return dto;
    }
}