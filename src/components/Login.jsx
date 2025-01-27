import { Link } from "react-router-dom";
import "../../src/App.css";
import "../../src/assets/ibibe-temp-logo.png"

const Login = () => {
  return (
    <div className="landing-page">
      <img src="/src/assets/ibibe-temp-logo.png" alt="Ibibe Logo" />
      {/* Header Section */}
      <header className="welcome-section">
        <h1>Welcome to Ibibe Gaming!</h1>
        <p>Game Dev Redefined</p>
      </header>

      {/* Action Buttons */}
      <div className="actions">
        <Link to="/signin">
          <button className="auth-button">Sign In</button>
        </Link>
      </div>

      {/* Login Form */}
      <div className="google-auth-form">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              
              className="form-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              
              className="form-input"
            />
          </div>
          <Link to="/dashboard">
            <button type="submit" className="auth-button">
              Login
            </button>
          </Link>
        </form>
        <p className="helper-text">
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
