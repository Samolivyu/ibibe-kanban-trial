// src/api/authService.js
import api from './axiosConfig';

// Mock user data for local development
const MOCK_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user'
};

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Store for mock authentication in development
let isAuthenticated = false;

export const authService = {
  login: async (email, password) => {
    try {
      // For development, use mock data
      if (isDev) {
        console.log('DEV MODE: Using mock login');
        
        // Simple validation for demo purposes
        if (email && password) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Set mock tokens
          localStorage.setItem('authToken', 'mock-auth-token-12345');
          localStorage.setItem('refreshToken', 'mock-refresh-token-12345');
          isAuthenticated = true;
          
          return { user: MOCK_USER, error: null };
        } else {
          return { 
            user: null, 
            error: 'Invalid credentials'
          };
        }
      }
      
      // Production code remains unchanged
      const response = await api.post('/auth/login', { email, password });
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
      // For development, use mock data
      if (isDev) {
        console.log('DEV MODE: Using mock registration');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return { 
          success: true, 
          data: { 
            message: 'Registration successful',
            user: { ...MOCK_USER, ...userData }
          }, 
          error: null 
        };
      }
      
      // Production code
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
    
    if (isDev) {
      console.log('DEV MODE: Mock logout');
      isAuthenticated = false;
      return { success: true };
    }
    
    return api.post('/auth/logout');
  },

  getCurrentUser: async () => {
    try {
      // For development, use mock data
      if (isDev) {
        console.log('DEV MODE: Using mock user data');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if user is "authenticated" in dev mode
        if (localStorage.getItem('authToken')) {
          return { user: MOCK_USER, error: null };
        } else {
          throw new Error('Not authenticated');
        }
      }
      
      // Production code
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