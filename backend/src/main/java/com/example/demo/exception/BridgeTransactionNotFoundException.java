package com.example.demo.exception;

public class BridgeTransactionNotFoundException extends RuntimeException {
    public BridgeTransactionNotFoundException(String message) {
        super(message);
    }
}
