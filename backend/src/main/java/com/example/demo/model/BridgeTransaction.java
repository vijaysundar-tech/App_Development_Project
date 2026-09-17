package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_transactions")
public class BridgeTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String transactionReference;
    private Double cryptoAmount;
    private Double fiatValue;
    private Double networkFee;
    private String bridgeStatus;
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name = "asset_id")
    private CryptoAsset asset;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private RecipientAccount account;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }

    public Double getCryptoAmount() {
        return cryptoAmount;
    }

    public void setCryptoAmount(Double cryptoAmount) {
        this.cryptoAmount = cryptoAmount;
    }

    public Double getFiatValue() {
        return fiatValue;
    }

    public void setFiatValue(Double fiatValue) {
        this.fiatValue = fiatValue;
    }

    public Double getNetworkFee() {
        return networkFee;
    }

    public void setNetworkFee(Double networkFee) {
        this.networkFee = networkFee;
    }

    public String getBridgeStatus() {
        return bridgeStatus;
    }

    public void setBridgeStatus(String bridgeStatus) {
        this.bridgeStatus = bridgeStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public CryptoAsset getAsset() {
        return asset;
    }

    public void setAsset(CryptoAsset asset) {
        this.asset = asset;
    }

    public RecipientAccount getAccount() {
        return account;
    }

    public void setAccount(RecipientAccount account) {
        this.account = account;
    }

    public BridgeTransaction() {
    }

    public BridgeTransaction(Long id, String transactionReference, Double cryptoAmount, Double fiatValue,
            Double networkFee, String bridgeStatus, LocalDateTime createdAt, CryptoAsset asset,
            RecipientAccount account) {
        this.id = id;
        this.transactionReference = transactionReference;
        this.cryptoAmount = cryptoAmount;
        this.fiatValue = fiatValue;
        this.networkFee = networkFee;
        this.bridgeStatus = bridgeStatus;
        this.createdAt = createdAt;
        this.asset = asset;
        this.account = account;
    }
}
