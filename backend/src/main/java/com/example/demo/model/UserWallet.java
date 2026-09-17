package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tbl_user_wallets")
public class UserWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String walletPublicKey;
    @NotBlank
    private String walletProvider;
    private Double lastKnownBalance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWalletPublicKey() {
        return walletPublicKey;
    }

    public void setWalletPublicKey(String walletPublicKey) {
        this.walletPublicKey = walletPublicKey;
    }

    public String getWalletProvider() {
        return walletProvider;
    }

    public void setWalletProvider(String walletProvider) {
        this.walletProvider = walletProvider;
    }

    public Double getLastKnownBalance() {
        return lastKnownBalance;
    }

    public void setLastKnownBalance(Double lastKnownBalance) {
        this.lastKnownBalance = lastKnownBalance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserWallet() {
    }

    public UserWallet(Long id, String walletPublicKey, String walletProvider, Double lastKnownBalance, User user) {
        this.id = id;
        this.walletPublicKey = walletPublicKey;
        this.walletProvider = walletProvider;
        this.lastKnownBalance = lastKnownBalance;
        this.user = user;
    }   

}
