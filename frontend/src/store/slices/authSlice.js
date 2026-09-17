import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
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
      };

      state.isAuthenticated = true;
      state.error = null;

      if (state.token) {
        localStorage.setItem("token", state.token);
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
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