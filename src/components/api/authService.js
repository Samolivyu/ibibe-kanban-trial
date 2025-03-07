// src/api/authService.js
import api from './axiosConfig';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Store tokens in localStorage if returned
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return { user: response.data.user, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data, error: null };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    return api.post('/auth/logout');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return { user: response.data, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: error.response?.data?.message || 'Failed to get user'
      };
    }
  }
};
