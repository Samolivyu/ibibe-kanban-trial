import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
