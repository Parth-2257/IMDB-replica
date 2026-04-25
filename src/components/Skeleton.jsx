import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  if (type === 'detail') {
    return (
      <div className="skeleton-detail">
        <div className="skeleton skeleton-poster"></div>
        <div className="skeleton-info">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-line short"></div>
          <div className="skeleton skeleton-line short"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
        </div>
      </div>
    );
  }

  return <div className="skeleton skeleton-card"></div>;
};

export default Skeleton;
