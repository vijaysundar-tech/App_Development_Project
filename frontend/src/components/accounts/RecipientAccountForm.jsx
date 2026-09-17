import React, { useState } from "react";
import { useSelector } from "react-redux";
import recipientAccountService from "../../services/recipientAccountService";

const RecipientAccountForm = () => {
  const user = useSelector((state) => state.auth?.user);
  const [bankNickname, setBankNickname] = useState("");
  const [iban, setIban] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("USD");
  const [swiftBicCode, setSwiftBicCode] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user?.id;

    if (!userId) {
      setStatus("Your login session does not contain a user ID. Please log in again.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      await recipientAccountService.create({
        userId,
        bankDisplayName: bankNickname.trim(),
        ibanNumber: iban.trim(),
        fiatCurrency,
        swiftBicCode: swiftBicCode.trim(),
      });

      setBankNickname("");
      setIban("");
      setSwiftBicCode("");
      setStatus("Recipient account registered successfully.");
      window.dispatchEvent(new Event("bitbridge-account-updated"));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to register recipient account.";
      setStatus(typeof message === "string" ? message : "Unable to register recipient account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-heading">
        <div>
          <span className="eyebrow">SETTLEMENT ACCOUNTS</span>
          <h1>Register Recipient Account</h1>
          <p>Configure a destination account for settlement operations.</p>
        </div>
        <div className="status-pill">● Account setup</div>
      </div>

      <div className="dashboard-card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="bankNickname">Bank Nickname</label>
              <input
                id="bankNickname"
                name="bankNickname"
                type="text"
                required
                value={bankNickname}
                onChange={(e) => setBankNickname(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="iban">IBAN</label>
              <input
                id="iban"
                name="iban"
                type="text"
                placeholder="Enter full IBAN"
                required
                value={iban}
                onChange={(e) => setIban(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="fiatCurrency">Fiat Currency</label>
              <select
                id="fiatCurrency"
                value={fiatCurrency}
                onChange={(e) => setFiatCurrency(e.target.value)}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
                <option>CHF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="swiftBicCode">SWIFT / BIC Code</label>
              <input
                id="swiftBicCode"
                name="swiftBicCode"
                type="text"
                placeholder="Enter SWIFT/BIC"
                required
                value={swiftBicCode}
                onChange={(e) => setSwiftBicCode(e.target.value)}
              />
            </div>
          </div>

          {status && <div className="inline-message">{status}</div>}

          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={saving}>
              {saving ? "Registering..." : "Register Account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RecipientAccountForm;
