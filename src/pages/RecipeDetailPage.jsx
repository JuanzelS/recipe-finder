import React from 'react';
import RecipeDetail from '../components/recipe/RecipeDetail';
import PageTransition from '../components/common/PageTransition';

const RecipeDetailPage = () => {
  return (
    <PageTransition>
      <div className="recipe-detail-page">
        <RecipeDetail />
      </div>
    </PageTransition>
  );
};

export default RecipeDetailPage;