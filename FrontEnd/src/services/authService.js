import api from "../lib/api";

export const login = (email, password) =>
  api.post("/login", { email, password });

export const register = (data) => api.post("/register", data);

export const logout = () => api.post("/logout");

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
  api.post("/auth/reset-password", { token, password });

export const verifyEmail = (token) => api.post("/auth/verify-email", { token });

export const resendVerification = (email) =>
  api.post("/auth/resend-verification", { email });
