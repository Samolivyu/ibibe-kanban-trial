/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
// Updated the import path for Hamburger since AuthContext.jsx is located in src/components/contexts and Hamburger is in src/pages.
import Hamburger from "../../pages/Hamburger"; 

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component - provides authentication state and actions
export const AuthProvider = ({ children }) => {
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

// AuthenticatedLayout component - wraps protected routes and displays the menu
export const AuthenticatedLayout = () => {
  return (
    <div>
      <Hamburger />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};