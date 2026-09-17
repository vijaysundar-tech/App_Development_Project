import api from "./api";

const authService = {
  login: (credentials) =>
    api.post("/api/auth/login", credentials),

  verify: () =>
    api.get("/api/auth/verify"),

  logout: () =>
    api.post("/api/auth/logout"),
};

export default authService;