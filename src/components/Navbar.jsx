import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <span className="logo">IMDb</span>
      </div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Top Rated</a>
        <a href="#">Watchlist</a>
      </div>
    </nav>
  );
};

export default Navbar;
