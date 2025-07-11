import React from 'react';
import { ProductCategory } from '../../../../types/types';
import { Button } from '../../../../ui/components/Button';
import './CatalogEmpty.scss';

type Props = {
  category: ProductCategory;
};

export const CatalogEmpty: React.FC<Props> = ({ category }) => (
  <div className="catalog-page__empty">
    <img
      className="catalog-page__empty__img"
      src="/img/product-not-found.png"
      alt="Products not found"
    />
    <p className="catalog-page__empty__text">There are no {category} yet</p>
    <Button
      variant="reload"
      onClick={() => window.location.reload()}
    >
      Reload
    </Button>
  </div>
);
