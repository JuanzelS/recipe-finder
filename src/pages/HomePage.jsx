import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchForm from '../components/recipe/SearchForm';
import RecipeList from '../components/recipe/RecipeList';
import { fetchRecipes } from '../features/recipes/recipeThunks';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // Load some initial recipes when the homepage mounts
  useEffect(() => {
    // Just fetch some random recipes to start
    dispatch(fetchRecipes({}));
  }, [dispatch]);
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Recipe Finder</h1>
        <p>Find delicious recipes from around the world</p>
      </div>
      
      <SearchForm />
      <RecipeList />
    </div>
  );
};

export default HomePage;