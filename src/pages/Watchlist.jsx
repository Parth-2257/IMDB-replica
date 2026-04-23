import React from 'react';
import './Watchlist.css';

const Watchlist = ({ watchlist, setWatchlist }) => {
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  return (
    <div className="watchlist-container">
      <header className="watchlist-header">
        <h1>My Watchlist ({watchlist?.length || 0})</h1>
      </header>

      {watchlist?.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty. Start adding movies!</p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-poster"
              />
              <div className="card-content">
                <h3 className="card-title" title={movie.title}>
                  {movie.title}
                </h3>
                <div className="card-meta">
                  <span className="card-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                  <span className="card-year">{movie.release_date?.split('-')[0]}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
