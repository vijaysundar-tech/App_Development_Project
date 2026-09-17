import React, { useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useInRouterContext,
} from "react-router-dom";
import { Provider, ReactReduxContext, useSelector } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import UserWalletForm from "./components/wallets/UserWalletForm";
import UserWalletList from "./components/wallets/UserWalletList";
import CryptoAssetForm from "./components/assets/CryptoAssetForm";
import CryptoAssetList from "./components/assets/CryptoAssetList";
import RecipientAccountForm from "./components/accounts/RecipientAccountForm";
import RecipientAccountList from "./components/accounts/RecipientAccountList";
import BridgeTransactionForm from "./components/transactions/BridgeTransactionForm";
import BridgeTransactionList from "./components/transactions/BridgeTransactionList";
import ErrorHandler from "./components/ErrorHandler";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function Home() {
  return (
    <>
      <Navbar />
      <main className="home-hero">
        <section className="hero-content">
          <span className="eyebrow">CRYPTO BRIDGE OPERATIONS</span>
          <h1>BitBridge Simulator</h1>
          <p>Simulate crypto asset bridging and settlement operations with a clear, connected operator workspace.</p>
          <div className="hero-actions">
            <a className="hero-link" href="/assets">Manage Assets</a>
            <a className="hero-link" href="/transactions">Open Transactions</a>
          </div>
        </section>
      </main>
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <ErrorHandler />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/assets" element={<ProtectedRoute><><Navbar /><CryptoAssetForm /><CryptoAssetList /></ProtectedRoute>} />
        <Route path="/liquidity" element={<ProtectedRoute><><Navbar /><UserWalletForm /><UserWalletList /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><><Navbar /><BridgeTransactionForm /><BridgeTransactionList /></ProtectedRoute>} />
        <Route path="/accounts" element={<ProtectedRoute><><Navbar /><RecipientAccountForm /><RecipientAccountList /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  const reduxContext = useContext(ReactReduxContext);
  const inRouter = useInRouterContext();
  let content = <AppRoutes />;
  if (!inRouter) content = <BrowserRouter>{content}</BrowserRouter>;
  if (!reduxContext) content = <Provider store={store}>{content}</Provider>;
  return content;
}

export default App;