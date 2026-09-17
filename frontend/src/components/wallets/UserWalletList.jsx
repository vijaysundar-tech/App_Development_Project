import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userWalletService from "../../services/userWalletService";
import { removeUserWallet, setError, setLoading, setUserWallets } from "../../store/slices/userWalletSlice";

const UserWalletList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const items = useSelector((state) => state.wallets?.items || []);
  const loading = useSelector((state) => state.wallets?.loading || false);
  const error = useSelector((state) => state.wallets?.error || null);
  const [message, setMessage] = useState("");

  const loadWallets = useCallback(async () => {
    const userId = user?.id;

    if (!userId) {
      dispatch(setUserWallets([]));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await userWalletService.getByUser(userId);
      const wallets = Array.isArray(response?.data) ? response.data : [];
      dispatch(setUserWallets(wallets));
    } catch (loadError) {
      console.error("Unable to load wallets:", loadError);
      dispatch(setError("Unable to load connected wallets."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    loadWallets();

    const handleWalletUpdated = () => {
      loadWallets();
    };

    window.addEventListener("bitbridge-wallet-updated", handleWalletUpdated);
    return () => {
      window.removeEventListener("bitbridge-wallet-updated", handleWalletUpdated);
    };
  }, [loadWallets]);

  const handleDisconnect = async (id) => {
    try {
      await userWalletService.disconnect(id);
      dispatch(removeUserWallet(id));
      setMessage("UserWallet deleted successfully.");
      window.dispatchEvent(new Event("bitbridge-wallet-updated"));
    } catch (disconnectError) {
      console.error("Unable to disconnect wallet:", disconnectError);
      setMessage("Unable to disconnect wallet.");
    }
  };

  return (
    <div className="list-container" style={{ maxWidth: "1000px", margin: "30px auto", padding: "25px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}>
      <div className="card-header">
        <h3>Connected Wallets</h3>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {loading && <p>Loading connected wallets...</p>}

      {!loading && items.length === 0 ? (
        <p>No connected wallets available.</p>
      ) : !loading ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Wallet</th>
              <th>Provider</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((wallet) => (
              <tr key={wallet.id}>
                <td>{wallet.id}</td>
                <td>{wallet.walletPublicKey || wallet.walletKey || wallet.publicKey || wallet.walletAddress || "-"}</td>
                <td>{wallet.walletProvider || "-"}</td>
                <td>{wallet.lastKnownBalance ?? "-"}</td>
                <td>
                  <button type="button" onClick={() => handleDisconnect(wallet.id)} style={{ cursor: "pointer" }}>
                    Disconnect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default UserWalletList;
