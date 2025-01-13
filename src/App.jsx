import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './components/Signin.js';
import SignUp from './components/Signup.js';
import Dashboard from './components/dashboard/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  <Route path="/" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>;

      </Router>
    </AuthProvider>
  );
}

export default App;
