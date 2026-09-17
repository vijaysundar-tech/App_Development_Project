package com.example.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_crypto_assets")
public class CryptoAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String assetSymbol;
    private String assetName;
    private String protocolNetwork;
    private Double currentLiquidity;
    private Boolean isBridgingActive;
    
    @OneToMany(mappedBy = "asset",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BridgeTransaction> transaction;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAssetSymbol() {
        return assetSymbol;
    }

    public void setAssetSymbol(String assetSymbol) {
        this.assetSymbol = assetSymbol;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getProtocolNetwork() {
        return protocolNetwork;
    }

    public void setProtocolNetwork(String protocolNetwork) {
        this.protocolNetwork = protocolNetwork;
    }

    public Double getCurrentLiquidity() {
        return currentLiquidity;
    }

    public void setCurrentLiquidity(Double currentLiquidity) {
        this.currentLiquidity = currentLiquidity;
    }

    public Boolean getIsBridgingActive() {
        return isBridgingActive;
    }

    public void setIsBridgingActive(Boolean isBridgingActive) {
        this.isBridgingActive = isBridgingActive;
    }

    public List<BridgeTransaction> getTransaction() {
        return transaction;
    }

    public void setTransaction(List<BridgeTransaction> transaction) {
        this.transaction = transaction;
    }

    public CryptoAsset() {
    }

    public CryptoAsset(Long id, String assetSymbol, String assetName, String protocolNetwork, Double currentLiquidity,
            Boolean isBridgingActive, List<BridgeTransaction> transaction) {
        this.id = id;
        this.assetSymbol = assetSymbol;
        this.assetName = assetName;
        this.protocolNetwork = protocolNetwork;
        this.currentLiquidity = currentLiquidity;
        this.isBridgingActive = isBridgingActive;
        this.transaction = transaction;
    }
}
