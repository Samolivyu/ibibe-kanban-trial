// src/api/axiosConfig.js
import axios from 'axios';

// Determine the base URL based on environment
const getBaseUrl = () => {
  // Check if running in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001/api'; // Local development API
  }
  return 'http://localhost:3001/api'; // Production API
};

const api = axios.create({
  baseURL: getBaseUrl(),
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
          // Use the same base URL for refresh token requests
          const { data } = await axios.post(
            `${getBaseUrl()}/auth/refresh`,
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

// For development debugging
if (process.env.NODE_ENV === 'development') {
  console.log('API configured with base URL:', getBaseUrl());
}

export default api;