// src/features/recipes/recipesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, fetchRecipeById } from './recipeThunks';

const initialState = {
  recipes: [],
  selectedRecipe: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchQuery: '',
  filters: {
    diet: [],
    cuisine: '',
    mealType: '',
  }
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearRecipes: (state) => {
      state.recipes = [];
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedRecipe = action.payload;
        state.error = null;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery, clearRecipes, updateFilters, clearFilters } = recipesSlice.actions;
export default recipesSlice.reducer;