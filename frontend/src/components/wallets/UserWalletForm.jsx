import React, { useState } from "react";
import { useSelector } from "react-redux";
import userWalletService from "../../services/userWalletService";

const UserWalletForm = () => {
  const user = useSelector((state) => state.auth?.user);

  const [walletKey, setWalletKey] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();

  const userId = user?.id;

  console.log("Save Wallet clicked");
  console.log("User ID:", userId);
  console.log("Wallet Key:", walletKey);

  if (!userId) {
    console.error("User is not logged in or user ID is missing");
    return;
  }

  if (!walletKey.trim()) {
    console.error("Wallet key is empty");
    return;
  }

  try {
    const response = await userWalletService.create({
      user: {
        id: userId,
      },
      walletPublicKey: walletKey.trim(),
    });

    console.log("Wallet saved:", response.data);

    setWalletKey("");

    window.dispatchEvent(new Event("bitbridge-wallet-updated"));
  } catch (error) {
    console.error("Failed to save wallet:", error);
  }
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
        <h2>Connect User Wallet</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="walletKey">Wallet Key</label>

          <input
            id="walletKey"
            name="walletKey"
            type="text"
            placeholder="0x..."
            required
            value={walletKey}
            onChange={(e) => setWalletKey(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              boxSizing: "border-box",
            }}
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
          Save Wallet
        </button>
      </form>
    </div>
  );
};

export default UserWalletForm;