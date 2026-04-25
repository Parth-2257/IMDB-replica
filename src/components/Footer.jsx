import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>IMDb Clone — Built with TMDB API</h3>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
