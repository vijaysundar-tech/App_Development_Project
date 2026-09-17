package com.example.demo.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tbl_liquidity_providers")
public class LiquidityProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String providerName;
    private String supportedAssets;
    private Double totalAllocatedLiquidity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getSupportedAssets() {
        return supportedAssets;
    }

    public void setSupportedAssets(String supportedAssets) {
        this.supportedAssets = supportedAssets;
    }

    public Double getTotalAllocatedLiquidity() {
        return totalAllocatedLiquidity;
    }

    public void setTotalAllocatedLiquidity(Double totalAllocatedLiquidity) {
        this.totalAllocatedLiquidity = totalAllocatedLiquidity;
    }

    public LiquidityProvider() {
    }

    public LiquidityProvider(Long id, @NotBlank String providerName, String supportedAssets,
            Double totalAllocatedLiquidity, List<BridgeTransaction> transaction) {
        this.id = id;
        this.providerName = providerName;
        this.supportedAssets = supportedAssets;
        this.totalAllocatedLiquidity = totalAllocatedLiquidity;
    }
}
