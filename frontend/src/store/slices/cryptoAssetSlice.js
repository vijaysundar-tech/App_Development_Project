import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cryptoAssetSlice =
  createSlice({
    name: "cryptoAssets",

    initialState,

    reducers: {
      setCryptoAssets: (
        state,
        action
      ) => {
        state.items =
          action.payload || [];
      },

      addCryptoAsset: (
        state,
        action
      ) => {
        state.items.push(
          action.payload
        );
      },

      removeCryptoAsset: (
        state,
        action
      ) => {
        state.items =
          state.items.filter(
            (item) =>
              item.id !== action.payload
          );
      },

      updateCryptoAsset: (
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
  setCryptoAssets,
  addCryptoAsset,
  removeCryptoAsset,
  updateCryptoAsset,
  setLoading,
  setError,
  clearError,
} = cryptoAssetSlice.actions;

export default cryptoAssetSlice.reducer;