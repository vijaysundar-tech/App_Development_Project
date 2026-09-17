package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.CryptoAsset;
import com.example.demo.repository.CryptoAssetRepository;

@Service
public class CryptoAssetService {
    @Autowired
    public CryptoAssetRepository repo;

    public List<CryptoAsset> getActiveAssets()
    {
        List<CryptoAsset> a = repo.findAll();
        return a;
    }

    public CryptoAsset registerAsset(CryptoAsset asset)
    {
        CryptoAsset a = repo.save(asset);
        return a;
    }

    public CryptoAsset modifyAsset(CryptoAsset asset)
    {
        if(repo.existsById(asset.getId())) {
            return repo.save(asset);
        }
        return null;
    }
    public void decommissionAsset(Long id)
    {
        repo.deleteById(id);
    }
}
