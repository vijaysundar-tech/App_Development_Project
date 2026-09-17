import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const userWalletSlice =
  createSlice({
    name: "wallets",

    initialState,

    reducers: {
      setUserWallets: (
        state,
        action
      ) => {
        state.items =
          action.payload || [];
      },

      addUserWallet: (
        state,
        action
      ) => {
        state.items.push(
          action.payload
        );
      },

      removeUserWallet: (
        state,
        action
      ) => {
        state.items =
          state.items.filter(
            (item) =>
              item.id !==
              action.payload
          );
      },

      updateUserWallet: (
        state,
        action
      ) => {
        const index =
          state.items.findIndex(
            (item) =>
              item.id ===
              action.payload.id
          );

        if (index !== -1) {
          state.items[index] =
            action.payload;
        }
      },

      setLoading: (
        state,
        action
      ) => {
        state.loading =
          action.payload;
      },

      setError: (
        state,
        action
      ) => {
        state.error =
          action.payload;
      },

      clearError: (
        state
      ) => {
        state.error = null;
      },
    },
  });

export const {
  setUserWallets,
  addUserWallet,
  removeUserWallet,
  updateUserWallet,
  setLoading,
  setError,
  clearError,
} = userWalletSlice.actions;

export default userWalletSlice.reducer;