package com.example.demo.dto;

public class RecipientAccountDTO {

    private Long id;
    private Long userId;
    private String bankDisplayName;
    private String ibanNumber;
    private String fiatCurrency;
    private String swiftBicCode;
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
    public RecipientAccountDTO() {
    }
    public RecipientAccountDTO(Long id, Long userId, String bankDisplayName, String ibanNumber, String fiatCurrency,
            String swiftBicCode) {
        this.id = id;
        this.userId = userId;
        this.bankDisplayName = bankDisplayName;
        this.ibanNumber = ibanNumber;
        this.fiatCurrency = fiatCurrency;
        this.swiftBicCode = swiftBicCode;
    }

}
