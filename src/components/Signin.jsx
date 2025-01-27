import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    navigate("/dashboard"); // Redirect to dashboard without authentication
  };

  return (
    <form className= "landing-page" onSubmit={handleSubmit}>
      <h1 className="welcome-section h1">Sign In</h1>
      <input className="welcome-section p"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        
      />
      <input className="welcome-section p"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        
      />
      <button type="submit">Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignIn;
