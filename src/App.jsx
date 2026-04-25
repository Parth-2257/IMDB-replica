import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import TopRated from './pages/TopRated';

import Footer from './components/Footer';

export const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
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
        <Footer />
      </div>
    </WatchlistContext.Provider>
  );
}

export default App;
