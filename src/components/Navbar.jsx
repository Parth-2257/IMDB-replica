import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo">IMDb</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Top Rated</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
