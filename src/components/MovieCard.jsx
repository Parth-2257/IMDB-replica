import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ poster, title, rating, year, id }) => {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {rating?.toFixed(1)}</span>
          <span className="year">{year?.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
