import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductCreatePage } from '@/pages/ProductCreatePage';
import { ProductEditPage } from '@/pages/ProductEditPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: 'products',
        element: <ProductListPage />,
      },
      {
        path: 'products/new',
        element: <ProductCreatePage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'products/:id/edit',
        element: <ProductEditPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
