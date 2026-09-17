package com.example.demo.dto;

import java.time.LocalDateTime;


public class BridgeTransactionDTO {
    private Long id;
    private String transactionReference;
    private Long assetId;
    private Long accountId;
    private Double cryptoAmount;
    private Double fiatValue;
    private Double networkFee;
    private String bridgeStatus;
    private LocalDateTime createdAt;
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
    public Long getAssetId() {
        return assetId;
    }
    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }
    public Long getAccountId() {
        return accountId;
    }
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
    public BridgeTransactionDTO() {
    }
    public BridgeTransactionDTO(Long id, String transactionReference, Long assetId, Long accountId,
            Double cryptoAmount, Double fiatValue, Double networkFee, String bridgeStatus, LocalDateTime createdAt) {
        this.id = id;
        this.transactionReference = transactionReference;
        this.assetId = assetId;
        this.accountId = accountId;
        this.cryptoAmount = cryptoAmount;
        this.fiatValue = fiatValue;
        this.networkFee = networkFee;
        this.bridgeStatus = bridgeStatus;
        this.createdAt = createdAt;
    }

}
