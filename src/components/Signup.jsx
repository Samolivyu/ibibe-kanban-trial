import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    setError(""); // Clear previous errors
    navigate("/dashboard"); // Redirect to dashboard without authentication
  };

  return (
    <form className="landing-page" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        
      />
      <Link to={'/dashboard'}><button type="submit">Sign Up</button></Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
