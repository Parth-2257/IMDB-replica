import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found.</div>;

  return (
    <div className="movie-detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back Home
      </button>
      <div className="detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="detail-poster"
        />
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          <p className="detail-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
          <p className="detail-date">Release Date: {movie.release_date}</p>
          {movie.genres && (
            <div className="detail-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <div className="detail-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          <button className="add-watchlist-btn">
            + Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
