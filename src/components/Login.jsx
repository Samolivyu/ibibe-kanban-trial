import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const signinRef = useRef('/signin');
  const signupRef = useRef('/signup');
  const dashboardRef = useRef('/dashboard');

  return (
    <div className="landing-page">
      <header className="welcome-section">
        <h1>Welcome to Ibibe Gaming!</h1>
        <p>Game Dev Redefined</p>
      </header>
      <div className="actions">
        <Link to={'/signin'}>
        <button ref={signinRef} className="btn btn-primary">
          Sign In
        </button>
        </Link>
        <Link to={'/signup'}>
        <button ref={signupRef} className="btn btn-secondary">
          Sign Up
        </button>
        </Link>

        <Link to={'/dashboard'}>
        <button ref={dashboardRef} className="btn btn-tertiary">
          Continue to Dashboard
        </button>
        </Link>
      </div>
      <form>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <Link to='/dashboard'>
          <button type="submit">Login</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
