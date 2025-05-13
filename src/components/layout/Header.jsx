import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { favoriteRecipes } = useSelector((state) => state.favorites);
  
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
        <div className="text-2xl font-bold">
          <Link to="/">
            <span className="text-primary">Recipe Finder</span>
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-primary font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : "text-gray-700 font-medium hover:text-primary transition-colors"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-primary font-medium relative flex items-center after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : "text-gray-700 font-medium hover:text-primary transition-colors flex items-center"
                }
              >
                Favorites
                {favoriteRecipes.length > 0 && (
                  <span className="ml-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {favoriteRecipes.length}
                  </span>
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