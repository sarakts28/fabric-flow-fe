import axios from "axios";

const API = axios.create({
  baseURL: "https://febric-flow-backend.onrender.com/api",
  withCredentials: true, // VERY IMPORTANT to send cookies (access + refresh)
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔄 Prevent infinite refresh loops
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ✨ Response Interceptor
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If token expired
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Hit your refresh token endpoint
        await API.post("/refresh");

        processQueue(null);
        isRefreshing = false;

        // Retry original API call
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
