import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bridgeTransactionService from "../../services/bridgeTransactionService";
import { addSettlement } from "../../store/slices/bridgeTransactionSlice";
import cryptoAssetService from "../../services/cryptoAssetService";
import userWalletService from "../../services/userWalletService";
import recipientAccountService from "../../services/recipientAccountService";
import { setCryptoAssets } from "../../store/slices/cryptoAssetSlice";
import { setUserWallets } from "../../store/slices/userWalletSlice";
import { setRecipientAccounts } from "../../store/slices/recipientAccountSlice";

const BridgeTransactionForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const assets = useSelector((state) => state.assets?.items || []);
  const wallets = useSelector((state) => state.wallets?.items || []);
  const accounts = useSelector((state) => state.accounts?.items || []);

  const [assetId, setAssetId] = useState("");
  const [walletId, setWalletId] = useState("");
  const [recipientAccountId, setRecipientAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        if (assets.length === 0) {
          const response = await cryptoAssetService.getAll();
          dispatch(setCryptoAssets(response.data || []));
        }

        if (user?.id && wallets.length === 0) {
          const response = await userWalletService.getByUser(user.id);
          dispatch(setUserWallets(response.data || []));
        }

        if (user?.id && accounts.length === 0) {
          const response = await recipientAccountService.getByUser(user.id);
          dispatch(setRecipientAccounts(response.data || []));
        }
      } catch (error) {
        console.error("Failed to load settlement dependencies:", error);
      }
    };

    loadDependencies();
  }, [accounts.length, assets.length, dispatch, user?.id, wallets.length]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await bridgeTransactionService.create({
        assetId: assetId ? Number(assetId) : null,
        accountId: recipientAccountId ? Number(recipientAccountId) : null,
        cryptoAmount: Number(amount),
      });

      if (response?.data) {
        dispatch(addSettlement(response.data));
      }

      setMessage("Transaction Initiated");
      setAmount("");
    } catch (error) {
      console.error(error);
      setMessage("Transaction Failed");
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "25px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}>
      <div className="card-header">
        <h2>Execute Bridge Settlement</h2>
      </div>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="assetId">Crypto Asset</label>
          <select id="assetId" name="assetId" required value={assetId} onChange={(e) => setAssetId(e.target.value)} style={fieldStyle}>
            <option value="">Select asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetSymbol || asset.symbol || asset.ticker || asset.assetName || asset.name || asset.id}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="walletId">Wallet</label>
          <select id="walletId" name="walletId" value={walletId} onChange={(e) => setWalletId(e.target.value)} style={fieldStyle}>
            <option value="">Select wallet</option>
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.walletPublicKey || wallet.walletKey || wallet.publicKey || wallet.id}
              </option>
            ))}
          </select>
          <small>Wallet selection is retained in the UI; the current backend transaction DTO does not store a wallet ID.</small>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="recipientAccountId">Recipient Account</label>
          <select id="recipientAccountId" name="recipientAccountId" value={recipientAccountId} onChange={(e) => setRecipientAccountId(e.target.value)} style={fieldStyle}>
            <option value="">Select recipient account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankDisplayName || account.bankNickname || account.ibanNumber || account.iban || account.id}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="amount">Settlement Amount</label>
          <input id="amount" name="amount" type="number" min="0" step="any" required value={amount} onChange={(e) => setAmount(e.target.value)} style={fieldStyle} />
        </div>

        <button type="submit" style={{ padding: "10px 18px", borderRadius: "5px", cursor: "pointer" }}>
          Execute Settlement
        </button>
      </form>
    </div>
  );
};

export default BridgeTransactionForm;
