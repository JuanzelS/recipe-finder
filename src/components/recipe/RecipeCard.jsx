import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  
  // Check if this recipe is in favorites
  const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.idMeal);
  
  // Toggle favorite status
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.idMeal));
    } else {
      dispatch(addToFavorites({
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        category: recipe.strCategory,
        area: recipe.strArea
      }));
    }
  };
  
  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        {recipe.strCategory && (
          <div className="recipe-category">
            <span>Category: {recipe.strCategory}</span>
          </div>
        )}
        {recipe.strArea && (
          <div className="recipe-area">
            <span>Cuisine: {recipe.strArea}</span>
          </div>
        )}
        <div className="recipe-card-actions">
          <Link to={`/recipe/${recipe.idMeal}`} className="btn-view-recipe">
            View Recipe
          </Link>
          <button 
            className={`btn-favorite ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? '❤️ Saved' : '🤍 Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;