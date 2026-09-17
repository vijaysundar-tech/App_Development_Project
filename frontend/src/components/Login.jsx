import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import authService from "../services/authService";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await authService.login({
        email,
        password,
      });

      const data = response?.data || response;

      dispatch(
        loginSuccess({
          token: data?.token || data?.accessToken,
          user: data?.user || {
            fullName: data?.fullName || email,
            email,
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Bridge Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="e.g. operator@bitbridge.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Simulation credentials"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{ cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;