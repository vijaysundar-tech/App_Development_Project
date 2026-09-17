import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bridgeTransactionService from "../../services/bridgeTransactionService";
import { removeTransaction } from "../../store/slices/bridgeTransactionSlice";

const BridgeTransactionList = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.transactions?.items || []
  );

  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await bridgeTransactionService.remove(id);

      dispatch(removeTransaction(id));

      setMessage("BridgeTransaction deleted successfully.");
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
        <h3>Bridge Transactions</h3>
      </div>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {items.length === 0 ? (
        <p>No bridge transactions available.</p>
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
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>

                <td>
                  {transaction.transactionReference || "-"}
                </td>

                <td>
                  {transaction.amount ?? "-"}
                </td>

                <td>
                  {transaction.bridgeStatus || "-"}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(transaction.id)}
                    style={{ cursor: "pointer" }}
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

export default BridgeTransactionList;