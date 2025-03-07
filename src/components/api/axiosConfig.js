// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://admin-api.ibibe.africa/api', // Your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor with token refresh example
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Optionally handle token refresh if your API supports it
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            'https://admin-api.ibibe.africa/api/auth/refresh',
            { refreshToken }
          );
          localStorage.setItem('authToken', data.token);
          error.config.headers['Authorization'] = `Bearer ${data.token}`;
          return axios(error.config); // retry the failed request
        } catch (refreshError) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // redirect to login
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
