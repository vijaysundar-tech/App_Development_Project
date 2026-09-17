import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userWalletService from "../../services/userWalletService";

const UserWalletList = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.wallets?.items || []
  );

  const [message, setMessage] = useState("");

  const handleDisconnect = async (id) => {
    try {
      await userWalletService.disconnect(id);

      setMessage("UserWallet deleted successfully.");

      window.dispatchEvent(new Event("bitbridge-wallet-updated"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="list-container"
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
        <h3>Connected Wallets</h3>
      </div>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {items.length === 0 ? (
        <p>No connected wallets available.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Wallet</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((wallet) => (
              <tr key={wallet.id}>
                <td>{wallet.id}</td>

                <td>
                  {wallet.walletKey ||
                    wallet.publicKey ||
                    wallet.walletAddress ||
                    "-"}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDisconnect(wallet.id)}
                    style={{ cursor: "pointer" }}
                  >
                    Disconnect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserWalletList;