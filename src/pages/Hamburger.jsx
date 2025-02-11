// src/components/Hamburger.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style.css";

const Hamburger = ({ currentPage, changePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = (page) => {
    changePage(page);
    // Adjust navigation paths as needed. For example:
    navigate(page === "dashboard" ? "/" : "/showtask");
  };

  return (
    <div className={`hamburger ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="hamburger-toggle" onClick={toggleSidebar}>
        ☰
      </div>
      <nav className="nav-menu">
        <button onClick={() => handleNavClick("dashboard")}>
          {/* Home icon – you can replace with an SVG/icon library */}
          <span role="img" aria-label="home">🏠</span>
        </button>
        <button onClick={() => handleNavClick("showtask")}>
          {/* Tasks icon */}
          <span role="img" aria-label="tasks">📋</span>
        </button>
      </nav>
    </div>
  );
};

export default Hamburger;
