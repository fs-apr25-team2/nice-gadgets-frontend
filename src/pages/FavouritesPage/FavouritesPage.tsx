import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/types';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';
import { Button } from '../../ui/components/Button';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { t } = useTranslation();
  const [favourites] = useLocalStorage<Product[]>('favourites', []);
  const navigate = useNavigate();

  const hasNoFavorites = favourites.length === 0;

  return (
    <div className="favourites-page">
      <div className="favourites-page__header">
        <Breadcrumbs />
        <h1 className="favourites-page__title">{t('favourites.title')}</h1>
        <p className="favourites-page__count">
          {t('items.total', { count: favourites.length })}
        </p>
      </div>

      {hasNoFavorites ?
        <div className="favourites-page__empty">
          <img
            src="/img/product-not-found.png"
            alt="No favorites"
          />
          <p>{t('favourites.empty.text')}</p>
          <Button
            variant="empty"
            onClick={() => navigate('/')}
          >
            {t('buttons.actions.goHome')}
          </Button>
        </div>
      : <ProductList products={favourites} />}
    </div>
  );
};
