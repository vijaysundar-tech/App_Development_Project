import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import bridgeTransactionReducer from "./slices/bridgeTransactionSlice";
import cryptoAssetReducer from "./slices/cryptoAssetSlice";
import recipientAccountReducer from "./slices/recipientAccountSlice";
import userWalletReducer from "./slices/userWalletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: bridgeTransactionReducer,
    assets: cryptoAssetReducer,
    accounts: recipientAccountReducer,
    wallets: userWalletReducer,
  },
});

export default store;