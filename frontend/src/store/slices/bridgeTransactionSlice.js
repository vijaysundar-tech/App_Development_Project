import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
};

const bridgeTransactionSlice = createSlice({
  name: "transactions",

  initialState,

  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload || [];
    },

    addSettlement: (state, action) => {
      state.items.push(action.payload);
    },

    removeTransaction: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearTransactions: (state) => {
      state.items = [];
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
  setTransactions,
  addSettlement,
  removeTransaction,
  clearTransactions,
  setError,
  clearError,
} = bridgeTransactionSlice.actions;

export default bridgeTransactionSlice.reducer;
