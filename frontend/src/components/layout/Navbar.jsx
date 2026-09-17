import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );

  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());

    window.dispatchEvent(new Event("bitbridge-cache-clear"));
  };

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div>
        <a href="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
          BitBridge
        </a>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <a href="/">Home</a>
        <a href="/assets">Assets</a>
        <a href="/liquidity">Liquidity</a>
        <a href="/transactions">Settlements/Transactions</a>

        {isAuthenticated && (
          <>
            <span>
              Welcome back! {user?.fullName || ""}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                color: "red",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
