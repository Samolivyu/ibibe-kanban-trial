import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/Signin.jsx';
import Subtask from './components/dashboard/Subtask.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';
import Task from './components/dashboard/Task.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/all" element={<Subtask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:userId" element={<Task />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
