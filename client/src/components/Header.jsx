import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <img 
          src="/TamilNadu_Logo.svg.png" 
          alt="Tamil Nadu Logo" 
          className="app-logo" 
        />
        <h1>Namma Sevai</h1>
      </Link>
    </header>
  );
};

export default Header;