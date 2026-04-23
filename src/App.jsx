import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import TopRated from './pages/TopRated';

export const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

function App() {
  const [watchlist, setWatchlist] = useState([]);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movie/:id"
            element={<MovieDetail watchlist={watchlist} setWatchlist={setWatchlist} />}
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />}
          />
          <Route path="/top-rated" element={<TopRated />} />
        </Routes>
      </div>
    </WatchlistContext.Provider>
  );
}

export default App;
