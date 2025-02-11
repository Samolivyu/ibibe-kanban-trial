import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="button" onClick={() => navigate("/dashboard")}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;