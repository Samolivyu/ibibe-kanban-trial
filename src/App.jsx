import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx'
import SignIn from './components/Signin.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  </ErrorBoundary>
  );
}

export default App;