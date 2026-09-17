package com.example.demo.exception;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BridgeTransactionNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleMissingSettlement(
            BridgeTransactionNotFoundException ex) {

        Map<String, String> response = new HashMap<>();

        response.put("error", "Bridge Transaction Not Found");
        response.put("message", ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleSimulationError(
            RuntimeException ex) {

        Map<String, String> response = new HashMap<>();

        response.put("error", "Bridge Operation Failed");
        response.put("message", ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDenied(
            AccessDeniedException ex) {

        Map<String, String> response = new HashMap<>();
        response.put("error", "Forbidden");
        response.put("message", "Access Denied");

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }
}