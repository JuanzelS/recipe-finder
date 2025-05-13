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
    <div className="container mx-auto px-4 pt-6">
      <div className="bg-white rounded-lg py-12 px-6 mb-8 text-center shadow-card">
        <h1 className="text-4xl font-bold text-primary mb-4">Recipe Finder</h1>
        <p className="text-xl text-gray-600">Find delicious recipes from around the world</p>
      </div>
      
      <SearchForm />
      <RecipeList />
    </div>
  );
};

export default HomePage;