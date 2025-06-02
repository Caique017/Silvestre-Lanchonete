import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api-docker-141213034707.us-central1.run.app", // URL base da API em produção
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT às requisições autenticadas
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
