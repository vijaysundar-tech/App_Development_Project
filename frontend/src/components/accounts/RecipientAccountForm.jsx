import React, { useState } from "react";
import recipientAccountService from "../../services/recipientAccountService";

const RecipientAccountForm = () => {
  const [bankNickname, setBankNickname] = useState("");
  const [iban, setIban] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await recipientAccountService.create({
        bankNickname,
        iban,
      });

      setBankNickname("");
      setIban("");
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle = {
    display: "block",
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
        <h2>Register Recipient Account</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="bankNickname">Bank Nickname</label>

          <input
            id="bankNickname"
            name="bankNickname"
            type="text"
            required
            value={bankNickname}
            onChange={(e) => setBankNickname(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label htmlFor="iban">IBAN</label>

          <input
            id="iban"
            name="iban"
            type="text"
            placeholder="Enter full IBAN"
            required
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            style={inputStyle}
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
          Register Account
        </button>
      </form>
    </div>
  );
};

export default RecipientAccountForm;