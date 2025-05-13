import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { removeFromFavorites, clearAllFavorites } from '../features/favorites/favoritesSlice';
import PageTransition from '../components/common/PageTransition';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoriteRecipes } = useSelector((state) => state.favorites);
  
  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites(id));
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearAllFavorites());
    }
  };
  
  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Favorite Recipes</h1>
          {favoriteRecipes.length > 0 && (
            <motion.button
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              onClick={handleClearAll}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          )}
        </div>
        
        {favoriteRecipes.length === 0 ? (
          <motion.div 
            className="bg-white rounded-lg shadow-md p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-600 mb-4">You haven't saved any favorite recipes yet.</p>
            <Link 
              to="/" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Browse Recipes
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favoriteRecipes.map((recipe) => (
              <motion.div 
                key={recipe.id} 
                className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="h-48 overflow-hidden">
                  <motion.img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  {recipe.category && <p className="text-gray-600 mb-1">Category: {recipe.category}</p>}
                  {recipe.area && <p className="text-gray-600 mb-1">Cuisine: {recipe.area}</p>}
                  <div className="mt-auto pt-4 flex gap-2">
                    <Link 
                      to={`/recipe/${recipe.id}`} 
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary-dark transition-colors"
                    >
                      View Recipe
                    </Link>
                    <motion.button
                      className="bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors"
                      onClick={() => handleRemoveFavorite(recipe.id)}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default FavoritesPage;