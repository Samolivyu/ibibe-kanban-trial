import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hamburger = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  return (
    <>
      <button className="menu-trigger" onClick={toggleMenu} aria-expanded={menuOpen} aria-label="Toggle menu">
        {menuOpen ? <X size={36} /> : <Menu size={30} />}
      </button>

      {menuOpen && (
        <div className="hamburger-menu">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <button className="menu-button" onClick={() => navigate("/dashboard")}>
              Home
            </button>
            <button className="menu-button logout-button" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hamburger;
