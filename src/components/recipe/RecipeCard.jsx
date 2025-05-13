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
    <div className="bg-white rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-3 truncate">{recipe.strMeal}</h3>
        {recipe.strCategory && (
          <div className="text-gray-600 mb-2">
            <span>Category: {recipe.strCategory}</span>
          </div>
        )}
        {recipe.strArea && (
          <div className="text-gray-600 mb-2">
            <span>Cuisine: {recipe.strArea}</span>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/recipe/${recipe.idMeal}`} 
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-center mr-2 hover:bg-primary-dark transition-colors"
          >
            View Recipe
          </Link>
          <button 
            className={`p-2 rounded-lg transition-colors ${isFavorite ? 'bg-red-100 text-primary' : 'bg-gray-200 text-gray-700'}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;