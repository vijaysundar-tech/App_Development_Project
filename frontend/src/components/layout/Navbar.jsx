import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    window.dispatchEvent(new Event("bitbridge-cache-clear"));
  };

  const linkClass = ({ isActive }) => (isActive ? "active-nav" : "");

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">B</span>
          <span>BitBridge</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/assets" className={linkClass}>Assets</NavLink>
          <NavLink to="/liquidity" className={linkClass}>Liquidity</NavLink>
          <NavLink to="/accounts" className={linkClass}>Accounts</NavLink>
          <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>

          {isAuthenticated && (
            <div className="nav-user">
              <span>Welcome back! {user?.fullName || ""}</span>
              <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;