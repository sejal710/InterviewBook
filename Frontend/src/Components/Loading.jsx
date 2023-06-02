import React from 'react';
import '../Sass/Loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;

