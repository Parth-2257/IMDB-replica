import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );
        const data = await response.json();
        setMovies((prev) => [...prev, ...(data.results || [])]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [page]);

  return (
    <div className="home-container">
      <h2 className="section-title">Top Rated Movies</h2>
      
      <div className="movie-grid">
        {movies.map((movie) => (
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

      {loading && <div className="loading">Loading...</div>}

      {!loading && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button
            className="genre-btn active"
            onClick={() => setPage((prev) => prev + 1)}
            style={{ padding: '0.8rem 2rem', fontSize: '1rem', cursor: 'pointer' }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRated;
