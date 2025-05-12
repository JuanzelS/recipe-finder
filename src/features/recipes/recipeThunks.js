// src/features/recipes/recipeThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipesByQuery, fetchRecipeDetails } from '../../services/recipeApi';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchRecipesByQuery(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchRecipeDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);