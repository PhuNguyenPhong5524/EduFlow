import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      const { data } = await axios.post(
        `${API_BASE_URL}/refresh-token`,
        {},
        { withCredentials: true },
      );
      localStorage.setItem("accessToken", data.accessToken);
      err.config.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(err.config);
    }
    return Promise.reject(err);
  },
);

export default api;
