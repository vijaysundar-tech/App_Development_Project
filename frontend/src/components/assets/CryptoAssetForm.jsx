import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cryptoAssetService from "../../services/cryptoAssetService";
import { addCryptoAsset } from "../../store/slices/cryptoAssetSlice";

const CryptoAssetForm = () => {
  const dispatch = useDispatch();

  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [network, setNetwork] = useState("");
  const [initialLiquidity, setInitialLiquidity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ticker || !name || !network || initialLiquidity === "") {
      return;
    }

    try {
      const response = await cryptoAssetService.create({
        assetSymbol: ticker,
        assetName: name,
        protocolNetwork: network,
        currentLiquidity: Number(initialLiquidity),
      });

      // Add newly created asset to Redux
      dispatch(addCryptoAsset(response.data));

      // Clear form
      setTicker("");
      setName("");
      setNetwork("");
      setInitialLiquidity("");

    } catch (error) {
      console.error("Failed to register crypto asset:", error);
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "25px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <div className="card-header">
        <h2>Configure Crypto Asset</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="ticker">Ticker Symbol *</label>
          <input
            id="ticker"
            name="ticker"
            type="text"
            placeholder="e.g. BTC"
            required
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            style={fieldStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="name">Asset Display Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Bitcoin"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={fieldStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="network">Protocol Network *</label>
          <select
            id="network"
            name="network"
            required
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            style={fieldStyle}
          >
            <option value="">Select network</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Polygon">Polygon</option>
            <option value="Solana">Solana</option>
            <option value="BNB Chain">BNB Chain</option>
          </select>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="initialLiquidity">
            Initial Simulation Liquidity *
          </label>

          <input
            id="initialLiquidity"
            name="initialLiquidity"
            type="number"
            min="0"
            step="any"
            placeholder="Simulation value"
            required
            value={initialLiquidity}
            onChange={(e) => setInitialLiquidity(e.target.value)}
            style={fieldStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 18px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register Asset
        </button>
      </form>
    </div>
  );
};

export default CryptoAssetForm;