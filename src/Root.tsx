import React from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { AppLayout } from './pages/AppLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/phones"
          element={<PhonesPage />}
        />
        <Route
          path="/tablets"
          element={<TabletsPage />}
        />
        <Route
          path="/accessories"
          element={<AccessoriesPage />}
        />
        <Route
          path="/product/:productId"
          element={<ProductPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/favourites"
          element={<FavouritesPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  </HashRouter>
);
