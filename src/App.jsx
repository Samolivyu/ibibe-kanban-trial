import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx'
import SignIn from './components/Signin.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';
import Users from './components/contexts/Users.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:userId" element={<Users />} />
        </Routes>
      </Router>
  </ErrorBoundary>
  );
}

export default App;