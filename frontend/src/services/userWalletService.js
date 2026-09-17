import api from "./api";

const userWalletService = {
  getByUser: (userId) =>
    api.get(`/api/wallets/user/${userId}`),

  create: (walletData) =>
    api.post("/api/wallets", walletData),

  disconnect: (id) =>
    api.delete(`/api/wallets/${id}`),
};

export default userWalletService;