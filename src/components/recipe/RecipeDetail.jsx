import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../../features/recipes/recipeThunks';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { motion } from 'framer-motion';

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <ErrorMessage message={error || 'Failed to load recipe'} />
        <button 
          onClick={handleGoBack} 
          className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center"
        >
          &larr; Go Back
        </button>
      </div>
    );
  }
  
  // Render empty state
  if (!selectedRecipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-lg mb-4">Recipe not found.</p>
        <button 
          onClick={handleGoBack} 
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center mx-auto"
        >
          &larr; Go Back
        </button>
      </div>
    );
  }
  
  const ingredients = getIngredientsList(selectedRecipe);
  const instructionSteps = formatInstructions(selectedRecipe.strInstructions);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
        <button 
          onClick={handleGoBack} 
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center"
        >
          &larr; Back to Recipes
        </button>
        <motion.button 
          className={`${isFavorite ? 'bg-red-100 text-primary' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-lg`}
          onClick={handleFavoriteToggle}
          whileTap={{ scale: 0.95 }}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </motion.button>
      </div>
      
      <div className="grid md:grid-cols-5 gap-8">
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={selectedRecipe.strMealThumb} 
            alt={selectedRecipe.strMeal} 
            className="w-full rounded-lg shadow-md"
          />
        </motion.div>
        
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4">{selectedRecipe.strMeal}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedRecipe.strCategory && (
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Category: {selectedRecipe.strCategory}
              </span>
            )}
            
            {selectedRecipe.strArea && (
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Cuisine: {selectedRecipe.strArea}
              </span>
            )}
            
            {selectedRecipe.strTags && (
              <div className="w-full mt-2 text-gray-600 text-sm">
                Tags: {selectedRecipe.strTags.split(',').map(tag => tag.trim()).join(', ')}
              </div>
            )}
          </div>
          
          {selectedRecipe.strYoutube && (
            <div className="mb-6">
              <a 
                href={selectedRecipe.strYoutube} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
              >
                <span className="mr-2">▶️</span> Watch Video Tutorial
              </a>
            </div>
          )}
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="divide-y divide-gray-200">
              {ingredients.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex justify-between py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <span className="font-medium">{item.ingredient}</span>
                  <span className="text-gray-600">{item.measure}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-3">
              {instructionSteps.map((step, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="text-gray-700"
                >
                  {step}
                </motion.li>
              ))}
            </ol>
          </motion.div>
          
          {selectedRecipe.strSource && (
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-semibold mb-2">Source</h3>
              <a 
                href={selectedRecipe.strSource} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark break-words"
              >
                {selectedRecipe.strSource}
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;