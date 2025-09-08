import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>TeamFlow</h1>
          <span className="tagline">Tailored team solutions.</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Teams</a>
          <a href="#" className="nav-link">Analytics</a>
          <a href="#" className="nav-link">Settings</a>
          <button className="contact-btn">Contact</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;