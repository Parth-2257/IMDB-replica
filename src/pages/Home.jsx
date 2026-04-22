import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = '';
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${searchQuery}`;
        } else {
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className="section-title">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
      </h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
