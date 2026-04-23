import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../App';
import './MovieCard.css';

const MovieCard = ({ poster, title, rating, year, id }) => {
  const navigate = useNavigate();
  const { watchlist, setWatchlist } = useContext(WatchlistContext);
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  const isInWatchlist = watchlist?.some((m) => m.id === id);

  const toggleWatchlist = (e) => {
    e.stopPropagation(); // Prevent card click from navigating
    if (isInWatchlist) {
      setWatchlist(watchlist.filter((m) => m.id !== id));
    } else {
      setWatchlist([
        ...watchlist,
        { id, title, poster_path: poster, vote_average: rating, release_date: year },
      ]);
    }
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)} style={{ position: 'relative' }}>
      <div
        className={`watchlist-badge ${isInWatchlist ? 'active' : ''}`}
        onClick={toggleWatchlist}
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: isInWatchlist ? '#f5c518' : 'rgba(0,0,0,0.6)',
          padding: '5px 8px',
          borderRadius: '4px',
          fontSize: '18px',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}
      >
        🔖
      </div>
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
