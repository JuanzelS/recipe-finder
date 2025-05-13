import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchForm from '../components/recipe/SearchForm';
import RecipeList from '../components/recipe/RecipeList';
import PageTransition from '../components/common/PageTransition';  // Make sure this import exists
import { fetchRecipes } from '../features/recipes/recipeThunks';

const HomePage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRecipes({}));
  }, [dispatch]);
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-6">
        <div className="bg-white rounded-lg py-12 px-6 mb-8 text-center shadow-md">
          <h1 className="text-4xl font-bold text-primary mb-4">Recipe Finder</h1>
          <p className="text-xl text-gray-600">Find delicious recipes from around the world</p>
        </div>
        
        <SearchForm />
        <RecipeList />
      </div>
    </PageTransition>
  );
};

export default HomePage;