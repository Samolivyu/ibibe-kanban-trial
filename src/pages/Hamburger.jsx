// src/components/Hamburger.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../"; 

const Hamburger = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = (page) => {
    navigate(page === "dashboard" ? "/dashboard" : "/showtask");
  };

  return (
    <div className={`hamburger ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="hamburger-toggle" onClick={toggleSidebar}>
        ☰
      </div>
      <nav className="nav-menu">
        <button onClick={() => handleNavClick("dashboard")}>
          <span role="img" aria-label="home">🏠 Home </span>
        </button>
        <button onClick={() => handleNavClick("showtask")}>
          <span role="img" aria-label="tasks">📋 Tasks</span>
        </button>
      </nav>
    </div>
  );
};

export default Hamburger;
