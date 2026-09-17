import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cryptoAssetService from "../../services/cryptoAssetService";

import {
  setCryptoAssets,
  removeCryptoAsset,
} from "../../store/slices/cryptoAssetSlice";

const CryptoAssetList = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.assets?.items || []
  );

  const [message, setMessage] = useState("");

  // Load assets from backend when page opens
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await cryptoAssetService.getAll();

        dispatch(setCryptoAssets(response.data));
      } catch (error) {
        console.error("Failed to load crypto assets:", error);
      }
    };

    loadAssets();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await cryptoAssetService.remove(id);

      dispatch(removeCryptoAsset(id));

      setMessage("CryptoAsset deleted successfully.");
    } catch (error) {
      console.error("Failed to delete crypto asset:", error);
    }
  };

  return (
    <div
      className="card"
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
        <h3>Asset Registry</h3>
      </div>

      {message && <p>{message}</p>}

      {items.length === 0 ? (
        <p>No crypto assets available.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Asset Name</th>
              <th>Network</th>
              <th>Liquidity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.assetSymbol || "-"}</td>

                <td>{asset.assetName || "-"}</td>

                <td>{asset.protocolNetwork || "-"}</td>

                <td>{asset.currentLiquidity ?? "-"}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(asset.id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Delete
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

export default CryptoAssetList;