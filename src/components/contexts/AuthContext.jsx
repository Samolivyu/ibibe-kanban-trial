/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = function ({ children }) {
  // Mock authentication state for testing
  const mockAuthState = {
    isAuthenticated: true, // Mock authenticated user
    user: {
      username: "Test User", // Mock username
      email: "testuser@example.com", // Mock email
    },
    login: () => console.log("Mock login called"),
    logout: () => console.log("Mock logout called"),
  };

  return (
    <AuthContext.Provider value={mockAuthState}>
      {children}
    </AuthContext.Provider>
  );
};
