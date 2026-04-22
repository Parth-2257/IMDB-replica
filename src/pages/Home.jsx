import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '3e10ae55fa5be512a7aa34b397703c3b';
  const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <h2 className="section-title">Trending Movies</h2>
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
    </div>
  );
};

export default Home;
