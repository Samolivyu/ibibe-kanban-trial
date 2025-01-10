import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
