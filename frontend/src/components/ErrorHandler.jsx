import React from "react";
import { useSelector } from "react-redux";

const ErrorHandler = ({ error }) => {
  const reduxError = useSelector(
    (state) => state.auth?.error || null
  );

  const activeError = error || reduxError;

  if (!activeError) {
    return null;
  }

  return (
    <div
      role="alert"
      style={{
        margin: "20px",
        padding: "15px",
        border: "1px solid #dc3545",
        borderRadius: "6px",
      }}
    >
      <h3>Bridge Error Detected</h3>
      <p>{activeError}</p>
    </div>
  );
};

export default ErrorHandler;