package com.example.demo.config;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.model.BridgeTransaction;
import com.example.demo.model.CryptoAsset;
import com.example.demo.model.RecipientAccount;
import com.example.demo.model.User;
import com.example.demo.repository.BridgeTransactionRepository;
import com.example.demo.repository.CryptoAssetRepository;
import com.example.demo.repository.RecipientAccountRepository;
import com.example.demo.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CryptoAssetRepository assetRepository;
    private final RecipientAccountRepository accountRepository;
    private final BridgeTransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            CryptoAssetRepository assetRepository,
            RecipientAccountRepository accountRepository,
            BridgeTransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.assetRepository = assetRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        // Prevent duplicate insertion
        if (userRepository.count() > 0) {
            return;
        }

        // =========================
        // ADMIN USER
        // =========================
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFullName("Admin");
        admin.setRole("ROLE_ADMIN");

        admin = userRepository.save(admin);

        // =========================
        // NORMAL USER
        // =========================
        User user = new User();
        user.setEmail("vijay@gmail.com");
        user.setPassword(passwordEncoder.encode("vijay123"));
        user.setFullName("Vijay Sundar");
        user.setRole("ROLE_TRADER");

        user = userRepository.save(user);

        // =========================
        // CRYPTO ASSET
        // =========================
        CryptoAsset asset = new CryptoAsset();
        asset.setAssetSymbol("BTC");
        asset.setAssetName("Bitcoin");
        asset.setProtocolNetwork("Bitcoin");
        asset.setCurrentLiquidity(250.5);
        asset.setIsBridgingActive(true);

        asset = assetRepository.save(asset);

        // =========================
        // RECIPIENT ACCOUNT
        // =========================
        RecipientAccount account = new RecipientAccount();
        account.setUserId(user.getId()); // only userId, not User object
        account.setBankDisplayName("HDFC Bank");
        account.setIbanNumber("IN123456789012");
        account.setFiatCurrency("INR");
        account.setSwiftBicCode("HDFCINBB");

        account = accountRepository.save(account);

        // =========================
        // BRIDGE TRANSACTION
        // =========================
        BridgeTransaction transaction = new BridgeTransaction();
        transaction.setTransactionReference("BB-" + UUID.randomUUID());
        transaction.setAsset(asset);
        transaction.setAccount(account);
        transaction.setCryptoAmount(0.25);
        transaction.setFiatValue(750.0);
        transaction.setNetworkFee(2.5);
        transaction.setBridgeStatus("PENDING");
        transaction.setCreatedAt(LocalDateTime.now());

        transactionRepository.save(transaction);

        System.out.println("======================================");
        System.out.println("Sample Data Inserted Successfully");
        System.out.println("Admin : admin@gmail.com / admin123");
        System.out.println("User  : vijay@gmail.com / vijay123");
        System.out.println("======================================");
    }
}