import React from 'react';
import '../Sass/Logo.scss';
import { useLocation } from 'react-router-dom';

const Logo = () => {
  const location = useLocation();
  const isHome = location.pathname === '/register' || location.pathname === '/';

  return (
    <div className="logo">
      <span className="logo-text">Interview</span>
      <span className={`logo-text ${isHome ? 'logo-highlight' : 'logolight'}`}>
        Handbook
      </span>
    </div>
  );
};

export default Logo;
