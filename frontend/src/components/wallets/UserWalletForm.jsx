import React, { useState } from "react";
import { useSelector } from "react-redux";
import userWalletService from "../../services/userWalletService";

const UserWalletForm = () => {
  const user = useSelector((state) => state.auth?.user);
  const [walletKey, setWalletKey] = useState("");
  const [walletProvider, setWalletProvider] = useState("MetaMask");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user?.id;

    if (!userId) {
      setStatus("Your login session does not contain a user ID. Please log in again.");
      return;
    }

    if (!walletKey.trim()) {
      setStatus("Enter a wallet public key before saving.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      await userWalletService.create({
        user: { id: userId },
        walletPublicKey: walletKey.trim(),
        walletProvider,
        lastKnownBalance: balance === "" ? 0 : Number(balance),
      });

      setWalletKey("");
      setBalance("");
      setStatus("Wallet connected successfully.");
      window.dispatchEvent(new Event("bitbridge-wallet-updated"));
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || "Unable to connect wallet.";
      setStatus(typeof message === "string" ? message : "Unable to connect wallet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-heading">
        <div>
          <span className="eyebrow">WALLET MANAGEMENT</span>
          <h1>Connect User Wallet</h1>
          <p>Link a wallet to your BitBridge simulation account.</p>
        </div>
        <div className="status-pill">● Secure connection</div>
      </div>

      <div className="dashboard-card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field field-wide">
              <label htmlFor="walletKey">Wallet Public Key</label>
              <input
                id="walletKey"
                name="walletKey"
                type="text"
                placeholder="0x..."
                required
                value={walletKey}
                onChange={(e) => setWalletKey(e.target.value)}
              />
              <small>Use the public wallet address only. Never enter a private key.</small>
            </div>

            <div className="field">
              <label htmlFor="walletProvider">Wallet Provider</label>
              <select id="walletProvider" value={walletProvider} onChange={(e) => setWalletProvider(e.target.value)}>
                <option>MetaMask</option>
                <option>Coinbase Wallet</option>
                <option>Trust Wallet</option>
                <option>Phantom</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="balance">Initial Balance</label>
              <input id="balance" type="number" min="0" step="any" placeholder="0.00" value={balance} onChange={(e) => setBalance(e.target.value)} />
            </div>
          </div>

          {status && <div className="inline-message">{status}</div>}

          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={saving}>
              {saving ? "Connecting..." : "Save Wallet"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserWalletForm;