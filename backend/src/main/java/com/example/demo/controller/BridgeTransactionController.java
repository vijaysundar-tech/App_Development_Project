package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BridgeTransactionDTO;
import com.example.demo.service.BridgeTransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin
public class BridgeTransactionController {

    @Autowired
    private BridgeTransactionService transactionService;

    // GET /
    @GetMapping
    public ResponseEntity<List<BridgeTransactionDTO>> fetchAllSettlements() {
        List<BridgeTransactionDTO> a = transactionService.getAllSettlements();
        return ResponseEntity.ok(a);
    }

    // POST /
    @PostMapping()
    public ResponseEntity<BridgeTransactionDTO> initiateBridgeSettlement(
            @Valid @RequestBody BridgeTransactionDTO transactionDTO) {

        BridgeTransactionDTO response =
                transactionService.initiateSettlement(transactionDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // PUT /{id}
    @PutMapping("/{id}")
    public ResponseEntity<BridgeTransactionDTO> updateSettlementRecord(
            @PathVariable Long id,
            @Valid @RequestBody BridgeTransactionDTO transactionDTO) {

        transactionDTO.setId(id);

        BridgeTransactionDTO response =
                transactionService.saveSettlement(transactionDTO);

        return ResponseEntity.ok(response);
    }

    // DELETE /{id}
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeSettlementRecord(@PathVariable Long id) {

        transactionService.archiveSettlement(id);

        return ResponseEntity.ok("BridgeTransaction deleted successfully.");
    }
}
