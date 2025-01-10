import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = () => {
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  const checkAuth = () => {
    // Authentication check logic here
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  // Fixed return statement with proper JSX syntax
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};