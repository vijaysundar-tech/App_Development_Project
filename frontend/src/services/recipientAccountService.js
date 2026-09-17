import api from "./api";

const recipientAccountService = {
  create: (account) => {
    return api.post("/api/recipient-accounts", account);
  },

  update: (id, account) => {
    return api.put(`/api/recipient-accounts/${id}`, account);
  },

  getAll: () => {
    return api.get("/api/recipient-accounts");
  },

  getByUser: (userId) => {
    return api.get(`/api/recipient-accounts/user/${userId}`);
  },

  remove: (id) => {
    return api.delete(`/api/recipient-accounts/${id}`);
  },
};

export default recipientAccountService;