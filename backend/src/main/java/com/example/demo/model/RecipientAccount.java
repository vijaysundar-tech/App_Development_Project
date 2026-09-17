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
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Entity
@Table(name = "tbl_recipient_accounts")
@Builder
public class RecipientAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @NotBlank
    private String bankDisplayName;
    @Column(unique = true)
    @NotBlank
    private String ibanNumber;
    @NotBlank
    private String fiatCurrency;
    @NotBlank
    private String swiftBicCode;

    @OneToMany(mappedBy = "account",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BridgeTransaction> transaction;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getBankDisplayName() {
        return bankDisplayName;
    }

    public void setBankDisplayName(String bankDisplayName) {
        this.bankDisplayName = bankDisplayName;
    }

    public String getIbanNumber() {
        return ibanNumber;
    }

    public void setIbanNumber(String ibanNumber) {
        this.ibanNumber = ibanNumber;
    }

    public String getFiatCurrency() {
        return fiatCurrency;
    }

    public void setFiatCurrency(String fiatCurrency) {
        this.fiatCurrency = fiatCurrency;
    }

    public String getSwiftBicCode() {
        return swiftBicCode;
    }

    public void setSwiftBicCode(String swiftBicCode) {
        this.swiftBicCode = swiftBicCode;
    }

    public List<BridgeTransaction> getTransaction() {
        return transaction;
    }

    public void setTransaction(List<BridgeTransaction> transaction) {
        this.transaction = transaction;
    }

    public RecipientAccount() {
    }

    public RecipientAccount(Long id, Long userId, @NotBlank String bankDisplayName, @NotBlank String ibanNumber,
            @NotBlank String fiatCurrency, @NotBlank String swiftBicCode, List<BridgeTransaction> transaction) {
        this.id = id;
        this.userId = userId;
        this.bankDisplayName = bankDisplayName;
        this.ibanNumber = ibanNumber;
        this.fiatCurrency = fiatCurrency;
        this.swiftBicCode = swiftBicCode;
        this.transaction = transaction;
    }
}
