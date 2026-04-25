import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/Skeleton';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Fetch Genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        let url = '';
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${searchQuery}`;
        } else if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${selectedGenre}`;
        } else {
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMovies(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery(''); // Clear search when genre is selected
  };

  const getSectionTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (selectedGenre) {
      const genre = genres.find(g => g.id === selectedGenre);
      return genre ? `${genre.name} Movies` : 'Movies';
    }
    return 'Trending Movies';
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setSelectedGenre(''); // Clear genre when searching
          }}
        />
      </div>

      <div className="genres-container">
        <button
          className={`genre-btn ${selectedGenre === '' ? 'active' : ''}`}
          onClick={() => setSelectedGenre('')}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <h2 className="section-title">{getSectionTitle()}</h2>

      {error ? (
        <div className="error" style={{ textAlign: 'center', color: '#f5c518', fontSize: '1.2rem', marginTop: '2rem' }}>
          Something went wrong. Please try again.
        </div>
      ) : loading ? (
        <div className="movie-grid">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} type="card" />
          ))}
        </div>
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
