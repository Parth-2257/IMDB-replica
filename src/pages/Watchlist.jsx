import React from 'react';

const Watchlist = () => {
  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1 style={{ borderLeft: '4px solid #f5c518', paddingLeft: '15px' }}>
        Your Watchlist
      </h1>
      <p style={{ marginTop: '20px', color: '#bbb' }}>
        No movies added to your watchlist yet.
      </p>
    </div>
  );
};

export default Watchlist;
