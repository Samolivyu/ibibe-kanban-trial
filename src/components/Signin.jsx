import React from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="button" onClick={() => navigate("/dashboard")}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
