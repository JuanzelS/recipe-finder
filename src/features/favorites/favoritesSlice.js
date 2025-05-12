// src/features/favorites/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteRecipes: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      const isAlreadyFavorite = state.favoriteRecipes.some(
        (favRecipe) => favRecipe.id === recipe.id
      );
      
      if (!isAlreadyFavorite) {
        state.favoriteRecipes.push(recipe);
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(state.favoriteRecipes));
      }
    },
    removeFromFavorites: (state, action) => {
      const recipeId = action.payload;
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe.id !== recipeId
      );
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favoriteRecipes));
    },
    clearAllFavorites: (state) => {
      state.favoriteRecipes = [];
      // Clear from localStorage
      localStorage.removeItem('favorites');
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;