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
    <div className="search-form-container">
      <h2>Find Your Next Meal</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="search-query">Search by Recipe Name</label>
          <input
            type="text"
            id="search-query"
            placeholder="Enter recipe name..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Filter by Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="area">Filter by Cuisine</label>
          <select
            id="area"
            name="area"
            value={filters.area}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Cuisines</option>
            {areas.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-search" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Search Recipes'}
          </button>
          <button 
            type="button" 
            className="btn-reset" 
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