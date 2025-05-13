import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, updateFilters, clearFilters } from '../../features/recipes/recipesSlice';
import { fetchRecipes } from '../../features/recipes/recipeThunks';
import { fetchCategories, fetchAreas } from '../../services/recipeApi';

const SearchForm = () => {
  const dispatch = useDispatch();
  const { searchQuery, filters } = useSelector((state) => state.recipes);
  
  // Local state for form inputs
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch filter options on component mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, areasData] = await Promise.all([
          fetchCategories(),
          fetchAreas()
        ]);
        setCategories(categoriesData);
        setAreas(areasData);
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFilterOptions();
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update global state with search query
    dispatch(setSearchQuery(localSearchQuery));
    
    // Determine search parameters based on form inputs
    const searchParams = {};
    
    if (localSearchQuery) {
      searchParams.query = localSearchQuery;
    } else if (filters.category) {
      searchParams.category = filters.category;
    } else if (filters.area) {
      searchParams.area = filters.area;
    }
    
    // Fetch recipes based on search params
    dispatch(fetchRecipes(searchParams));
  };
  
  // Reset all form fields and filters
  const handleReset = () => {
    setLocalSearchQuery('');
    dispatch(clearFilters());
  };
  
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-card">
      <h2 className="text-2xl font-semibold text-center mb-4">Find Your Next Meal</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <div className="mb-4">
          <label htmlFor="search-query" className="block mb-2 font-medium">
            Search by Recipe Name
          </label>
          <input
            type="text"
            id="search-query"
            placeholder="Enter recipe name..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 font-medium">
            Filter by Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="area" className="block mb-2 font-medium">
            Filter by Cuisine
          </label>
          <select
            id="area"
            name="area"
            value={filters.area}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Cuisines</option>
            {areas.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-3 flex space-x-4">
          <button 
            type="submit" 
            className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search Recipes'}
          </button>
          <button 
            type="button" 
            className="bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;