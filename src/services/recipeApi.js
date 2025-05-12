// Base URL for TheMealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Fetches recipes based on search query parameters
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search term
 * @param {string} params.category - Meal category
 * @param {string} params.area - Cuisine area
 * @returns {Promise<Array>} - Array of recipe objects
 */
export const fetchRecipesByQuery = async (params) => {
  let endpoint = '';
  
  // Determine which endpoint to use based on params
  if (params.query) {
    // Search by name
    endpoint = `${BASE_URL}/search.php?s=${encodeURIComponent(params.query)}`;
  } else if (params.category) {
    // Filter by category
    endpoint = `${BASE_URL}/filter.php?c=${encodeURIComponent(params.category)}`;
  } else if (params.area) {
    // Filter by cuisine area
    endpoint = `${BASE_URL}/filter.php?a=${encodeURIComponent(params.area)}`;
  } else if (params.ingredient) {
    // Filter by main ingredient
    endpoint = `${BASE_URL}/filter.php?i=${encodeURIComponent(params.ingredient)}`;
  } else {
    // Default: fetch random selection
    const randomMeals = [];
    // Fetch 10 random meals
    for (let i = 0; i < 10; i++) {
      try {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          randomMeals.push(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    }
    return randomMeals;
  }

  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Fetches recipe details by ID
 * @param {string} id - Recipe ID
 * @returns {Promise<Object>} - Recipe detail object
 */
export const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Recipe not found');
    }
    
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

/**
 * Fetches all available meal categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetches all available cuisine areas
 * @returns {Promise<Array>} - Array of area strings
 */
export const fetchAreas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};

/**
 * Fetches all available ingredients
 * @returns {Promise<Array>} - Array of ingredient objects
 */
export const fetchIngredients = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};