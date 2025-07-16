import React from 'react';
import { AuthProvider } from './context/AuthProvider';
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
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/AuthPage/LoginPage';
import { RegisterPage } from './pages/AuthPage/RegisterPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Theme } from './types/types';
import { THEME_KEY } from './constants';

export const Root: React.FC = () => {
  const [theme] = useLocalStorage<Theme>(THEME_KEY, Theme.Light);

  return (
    <AuthProvider>
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
              path="/checkout"
              element={<CheckoutPage />}
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
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
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
          theme={theme}
          transition={Bounce}
        />
      </HashRouter>
    </AuthProvider>
  );
};
