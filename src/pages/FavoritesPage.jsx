import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites, clearAllFavorites } from '../features/favorites/favoritesSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoriteRecipes } = useSelector((state) => state.favorites);
  
  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites(id));
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearAllFavorites());
    }
  };
  
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Your Favorite Recipes</h1>
        {favoriteRecipes.length > 0 && (
          <button 
            className="btn-clear-all" 
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>
      
      {favoriteRecipes.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't saved any favorite recipes yet.</p>
          <Link to="/" className="btn-browse">Browse Recipes</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="favorite-card">
              <div className="favorite-image">
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <div className="favorite-content">
                <h3>{recipe.title}</h3>
                {recipe.category && <p>Category: {recipe.category}</p>}
                {recipe.area && <p>Cuisine: {recipe.area}</p>}
                <div className="favorite-actions">
                  <Link to={`/recipe/${recipe.id}`} className="btn-view">
                    View Recipe
                  </Link>
                  <button 
                    className="btn-remove" 
                    onClick={() => handleRemoveFavorite(recipe.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;