// src/routes.js
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/recipe/:id',
        element: <RecipeDetailPage />
      },
      {
        path: '/favorites',
        element: <FavoritesPage />
      }
    ]
  }
]);

export default router;