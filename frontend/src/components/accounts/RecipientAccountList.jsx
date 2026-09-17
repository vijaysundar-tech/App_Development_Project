import React, { useState } from "react";
import { useSelector } from "react-redux";
import recipientAccountService from "../../services/recipientAccountService";

const RecipientAccountList = () => {
  const items = useSelector(
    (state) => state.accounts?.items || []
  );

  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await recipientAccountService.remove(id);

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
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Bank Nickname</th>
              <th>IBAN</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.bankNickname || "-"}</td>
                <td>{account.iban || "-"}</td>

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