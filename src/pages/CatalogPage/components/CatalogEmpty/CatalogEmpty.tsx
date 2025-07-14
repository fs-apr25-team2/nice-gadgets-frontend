import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCategory } from '../../../../types/types';
import { Button } from '../../../../ui/components/Button';
import './CatalogEmpty.scss';

type Props = {
  category: ProductCategory;
};

export const CatalogEmpty: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation();

  const categoryText = t(`navLink.${category}`);

  return (
    <div className="catalog-page__empty">
      <img
        className="catalog-page__empty__img"
        src="/img/product-not-found.png"
        alt="Products not found"
      />
      <p className="catalog-page__empty__text">
        {t(`catalog.empty`, { category: categoryText })}
      </p>
      <Button
        variant="reload"
        onClick={() => window.location.reload()}
      >
        {t('buttons.actions.reload')}
      </Button>
    </div>
  );
};
