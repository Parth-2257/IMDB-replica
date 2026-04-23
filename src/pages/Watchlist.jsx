import React from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css'; // Reusing existing grid styles

const Watchlist = ({ watchlist }) => {
  return (
    <div className="home-container">
      <h2 className="section-title">Your Watchlist</h2>
      {watchlist?.length === 0 ? (
        <p className="no-results">No movies saved yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
