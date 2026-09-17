import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const recipientAccountSlice =
  createSlice({
    name: "recipientAccounts",

    initialState,

    reducers: {
      setRecipientAccounts: (
        state,
        action
      ) => {
        state.items =
          action.payload || [];
      },

      addRecipientAccount: (
        state,
        action
      ) => {
        state.items.push(
          action.payload
        );
      },

      removeRecipientAccount: (
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

      updateRecipientAccount: (
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
  setRecipientAccounts,
  addRecipientAccount,
  removeRecipientAccount,
  updateRecipientAccount,
  setLoading,
  setError,
  clearError,
} = recipientAccountSlice.actions;

export default recipientAccountSlice.reducer;