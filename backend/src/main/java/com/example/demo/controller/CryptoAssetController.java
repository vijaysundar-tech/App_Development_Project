package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CryptoAsset;
import com.example.demo.service.CryptoAssetService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/assets")
public class CryptoAssetController {
    
    @Autowired
    public CryptoAssetService service;

    @GetMapping()
    public ResponseEntity<List<CryptoAsset>> getActiveAsset()
    {
        List<CryptoAsset> a = service.getActiveAssets();
        return ResponseEntity.status(200).body(a);
    }

    @PostMapping()
    public ResponseEntity<CryptoAsset> regiterAsset(@Valid @RequestBody CryptoAsset asset)
    {
        CryptoAsset a = service.registerAsset(asset);
        return ResponseEntity.status(201).body(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CryptoAsset> modifyAsset(@PathVariable Long id, @Valid @RequestBody CryptoAsset asset)
    {
        asset.setId(id);
        CryptoAsset a = service.modifyAsset(asset);
        return ResponseEntity.status(200).body(a);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> decommissionAsset(@PathVariable Long id)
    {
        service.decommissionAsset(id);
        return ResponseEntity.status(200).body("CryptoAsset deleted successfully");
    }

}