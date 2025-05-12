import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const RecipeList = () => {
  const { recipes, status, error, searchQuery } = useSelector((state) => state.recipes);
  
  // Render based on the current status
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Loader message="Searching for recipes..." />;
      
      case 'failed':
        return <ErrorMessage message={error || 'Failed to fetch recipes'} />;
      
      case 'succeeded':
        if (recipes.length === 0) {
          return (
            <div className="no-results">
              <p>No recipes found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          );
        }
        
        return (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        );
      
      default:
        return (
          <div className="initial-state">
            <p>Search for recipes or choose a category to get started.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="recipe-list-container">
      <h2>
        {status === 'succeeded' && recipes.length > 0
          ? `Found ${recipes.length} Recipe${recipes.length !== 1 ? 's' : ''}`
          : 'Recipes'}
      </h2>
      {renderContent()}
    </div>
  );
};

export default RecipeList;