import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import authService from "../services/authService";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      const data = response?.data || response;

      dispatch(loginSuccess({
        token: data?.token || data?.accessToken,
        id: data?.id,
        fullName: data?.fullName,
        email: data?.email || email,
        role: data?.role,
        user: data?.user,
      }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-label="BitBridge login">
        <span className="eyebrow">BITBRIDGE SIMULATOR</span>
        <h1>Bridge Login</h1>
        <p>Sign in to manage assets, wallets and settlement simulations.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="e.g. operator@bitbridge.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Simulation credentials" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="inline-message" role="alert">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;