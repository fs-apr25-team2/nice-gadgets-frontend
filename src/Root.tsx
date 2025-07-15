import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router';
import { AppLayout } from './pages/AppLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from './pages/RightsPage';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route path=":category">
          <Route
            index
            element={<CatalogPage />}
          />
          <Route
            path=":productId"
            element={<ProductPage />}
          />
        </Route>
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/favourites"
          element={<FavouritesPage />}
        />
        <Route
          path="/contacts"
          element={<ContactsPage />}
        />
        <Route
          path="/rights"
          element={<RightsPage />}
        />
        <Route
          path="/not-found"
          element={<NotFoundPage />}
        />
        <Route
          path="*"
          element={<Navigate to="/not-found" />}
        />
      </Route>
    </Routes>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      limit={5}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </HashRouter>
);
