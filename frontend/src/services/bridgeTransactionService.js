import api from "./api";

const bridgeTransactionService = {
  create: (data) =>
    api.post("/api/transactions", data),

  update: (id, data) =>
    api.put(`/api/transactions/${id}`, data),

  getAll: () =>
    api.get("/api/transactions"),

  remove: (id) =>
    api.delete(`/api/transactions/${id}`),
};

export default bridgeTransactionService;