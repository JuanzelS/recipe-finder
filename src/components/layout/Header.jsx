import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { favoriteRecipes } = useSelector((state) => state.favorites);
  
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">Recipe Finder</span>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => 
                isActive ? 'active' : ''
              }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => 
                isActive ? 'active' : ''
              }>
                Favorites
                {favoriteRecipes.length > 0 && (
                  <span className="favorites-count">{favoriteRecipes.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;