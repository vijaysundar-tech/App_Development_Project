import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipientAccountService from "../../services/recipientAccountService";
import {
  setRecipientAccounts,
  removeRecipientAccount,
} from "../../store/slices/recipientAccountSlice";

const RecipientAccountList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const items = useSelector((state) => state.accounts?.items || []);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadAccounts = async () => {
      if (!user?.id) return;

      try {
        const response = await recipientAccountService.getByUser(user.id);
        dispatch(setRecipientAccounts(response.data || []));
      } catch (error) {
        console.error("Failed to load recipient accounts:", error);
      }
    };

    loadAccounts();
  }, [dispatch, user?.id]);

  useEffect(() => {
    const refreshAccounts = async () => {
      if (!user?.id) return;

      try {
        const response = await recipientAccountService.getByUser(user.id);
        dispatch(setRecipientAccounts(response.data || []));
      } catch (error) {
        console.error("Failed to refresh recipient accounts:", error);
      }
    };

    window.addEventListener("bitbridge-account-updated", refreshAccounts);
    return () =>
      window.removeEventListener("bitbridge-account-updated", refreshAccounts);
  }, [dispatch, user?.id]);

  const handleDelete = async (id) => {
    try {
      await recipientAccountService.remove(id);
      dispatch(removeRecipientAccount(id));
      setMessage("RecipientAccount deleted successfully.");
    } catch (error) {
      console.error(error);
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
        <h3>Recipient Accounts</h3>
      </div>

      {message && <p>{message}</p>}

      {items.length === 0 ? (
        <p>No recipient accounts available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Bank Nickname</th>
              <th>IBAN</th>
              <th>Currency</th>
              <th>SWIFT / BIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.bankDisplayName || account.bankNickname || "-"}</td>
                <td>{account.ibanNumber || account.iban || "-"}</td>
                <td>{account.fiatCurrency || "-"}</td>
                <td>{account.swiftBicCode || "-"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(account.id)}
                    style={{ cursor: "pointer" }}
                  >
                    Clear
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

export default RecipientAccountList;
