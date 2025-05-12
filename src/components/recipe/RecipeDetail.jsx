import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../../features/recipes/recipeThunks';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedRecipe, status, error } = useSelector((state) => state.recipes);
  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  
  // Check if this recipe is in favorites
  const isFavorite = selectedRecipe && 
    favoriteRecipes.some((recipe) => recipe.id === selectedRecipe.idMeal);
  
  // Fetch recipe details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id]);
  
  // Handle back button click
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Toggle favorite status
  const handleFavoriteToggle = () => {
    if (!selectedRecipe) return;
    
    if (isFavorite) {
      dispatch(removeFromFavorites(selectedRecipe.idMeal));
    } else {
      dispatch(addToFavorites({
        id: selectedRecipe.idMeal,
        title: selectedRecipe.strMeal,
        image: selectedRecipe.strMealThumb,
        category: selectedRecipe.strCategory,
        area: selectedRecipe.strArea
      }));
    }
  };
  
  // Extract ingredients and measures from recipe
  const getIngredientsList = (recipe) => {
    const ingredients = [];
    
    // TheMealDB API stores ingredients and measures in numbered properties
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient,
          measure: measure || ''
        });
      }
    }
    
    return ingredients;
  };
  
  // Format instructions into steps
  const formatInstructions = (instructions) => {
    if (!instructions) return [];
    
    // Split by periods followed by a space or newline
    return instructions
      .split(/\.\s+|\.\n+/)
      .filter(step => step.trim() !== '')
      .map(step => step.trim() + (step.endsWith('.') ? '' : '.'));
  };
  
  // Render loading state
  if (status === 'loading') {
    return <Loader message="Loading recipe details..." />;
  }
  
  // Render error state
  if (status === 'failed') {
    return (
      <div className="recipe-detail-error">
        <ErrorMessage message={error || 'Failed to load recipe'} />
        <button onClick={handleGoBack} className="btn-back">
          &larr; Go Back
        </button>
      </div>
    );
  }
  
  // Render empty state
  if (!selectedRecipe) {
    return (
      <div className="recipe-detail-empty">
        <p>Recipe not found.</p>
        <button onClick={handleGoBack} className="btn-back">
          &larr; Go Back
        </button>
      </div>
    );
  }
  
  const ingredients = getIngredientsList(selectedRecipe);
  const instructionSteps = formatInstructions(selectedRecipe.strInstructions);
  
  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <button onClick={handleGoBack} className="btn-back">
          &larr; Back to Recipes
        </button>
        <button 
          className={`btn-favorite ${isFavorite ? 'is-favorite' : ''}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
      
      <div className="recipe-detail-content">
        <div className="recipe-detail-image">
          <img 
            src={selectedRecipe.strMealThumb} 
            alt={selectedRecipe.strMeal} 
          />
        </div>
        
        <div className="recipe-detail-info">
          <h1 className="recipe-title">{selectedRecipe.strMeal}</h1>
          
          <div className="recipe-meta">
            {selectedRecipe.strCategory && (
              <span className="recipe-category">
                Category: {selectedRecipe.strCategory}
              </span>
            )}
            
            {selectedRecipe.strArea && (
              <span className="recipe-area">
                Cuisine: {selectedRecipe.strArea}
              </span>
            )}
            
            {selectedRecipe.strTags && (
              <div className="recipe-tags">
                Tags: {selectedRecipe.strTags.split(',').map(tag => tag.trim()).join(', ')}
              </div>
            )}
          </div>
          
          {selectedRecipe.strYoutube && (
            <div className="recipe-video">
              <a 
                href={selectedRecipe.strYoutube} 
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                Watch Video Tutorial
              </a>
            </div>
          )}
          
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  <span className="ingredient">{item.ingredient}</span>
                  <span className="measure">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="recipe-instructions">
            <h2>Instructions</h2>
            <ol>
              {instructionSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          {selectedRecipe.strSource && (
            <div className="recipe-source">
              <h3>Source</h3>
              <a 
                href={selectedRecipe.strSource} 
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRecipe.strSource}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;