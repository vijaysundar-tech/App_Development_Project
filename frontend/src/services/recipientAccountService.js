import api from "./api";

const recipientAccountService = {
  create: (account) =>
    api.post("/api/accounts", account),

  update: (id, account) =>
    api.put(`/api/accounts/${id}`, account),

  getAll: () =>
    api.get("/api/accounts"),

  getByUser: (userId) =>
    api.get(`/api/accounts/user/${userId}`),

  remove: (id) =>
    api.delete(`/api/accounts/${id}`),
};

export default recipientAccountService;
