import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/types';
import { ProductList } from '../../components/ProductList/ProductList';
import { useNavigate } from 'react-router';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const [favourites] = useLocalStorage<Product[]>('favourites', []);
  const navigate = useNavigate();

  const hasNoFavorites = favourites.length === 0;

  return (
    <div className="favourites-page">
      <div className="favourites-page__header">
        <Breadcrumbs />
        <h1 className="favourites-page__title">Favourites</h1>
        <p className="favourites-page__count">
          {favourites.length} item{favourites.length !== 1 && 's'}
        </p>
      </div>

      {hasNoFavorites ?
        <div className="favourites-page__empty">
          <img
            src="/img/product-not-found.png"
            alt="No favorites"
            className="favourites-page__empty-image"
          />
          <p className="favourites-page__empty-text">
            There are no favourites yet
          </p>
          <button
            className="favourites-page__home-button"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
        </div>
      : <ProductList products={favourites} />}
    </div>
  );
};
