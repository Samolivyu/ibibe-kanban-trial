import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx';


function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

export default App;