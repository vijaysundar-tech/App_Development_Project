import api from "./api";

const cryptoAssetService = {
  create: (asset) =>
    api.post("/api/assets", asset),

  update: (id, asset) =>
    api.put(`/api/assets/${id}`, asset),

  getAll: () =>
    api.get("/api/assets"),

  remove: (id) =>
    api.delete(`/api/assets/${id}`),
};

export default cryptoAssetService;