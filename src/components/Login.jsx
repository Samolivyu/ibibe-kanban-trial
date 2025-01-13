import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
  const [credentials, setCredentials] = useState({ username: 'admin', password: 'ibibe1!' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials); // Ensure login process is successful
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error('Login failed:', error); // Handle login failure
    }
  };

  return (
    <div className="landing-page">
      <header className="welcome-section">
        <h1>Welcome to Ibibe Gaming!</h1>
        <p>Game Dev Redefined</p>
      </header>
      <div className="actions">
        <button onClick={() => navigate('/signin')} className="btn btn-primary">
          Sign In
        </button>
        <button onClick={() => navigate('/signup')} className="btn btn-secondary">
          Sign Up
        </button>
        <button onClick={() => navigate('/dashboard')} className="btn btn-tertiary">
          Continue to Dashboard
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
