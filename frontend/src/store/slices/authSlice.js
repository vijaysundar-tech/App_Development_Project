import { createSlice } from "@reduxjs/toolkit";

const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    return null;
  }
})();

const initialState = {
  token: localStorage.getItem("token") || null,
  user: storedUser,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload || {};

      state.token = payload.token || null;

      state.user = {
        id: payload.user?.id ?? payload.id,
        fullName:
          payload.user?.fullName ||
          payload.fullName ||
          "Operator X",
        email:
          payload.user?.email ||
          payload.email ||
          "",
        role: payload.user?.role || payload.role || "",
      };

      state.isAuthenticated = true;
      state.error = null;

      if (state.token) {
        localStorage.setItem("token", state.token);
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
