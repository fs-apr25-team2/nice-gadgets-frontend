import React from 'react';
import './CatalogPage.scss';
import { ProductCategory } from '../../types/types';
import { Heading } from '../../ui/components/Heading';
import { CATALOG_TITLES } from '../../constants';
import { Navigate, useParams } from 'react-router';

const categories: ProductCategory[] = ['phones', 'tablets', 'accessories'];

function isProductCategory(value: string): value is ProductCategory {
  return categories.includes(value as ProductCategory);
}

export const CatalogPage: React.FC = () => {
  const { category } = useParams();

  if (!isProductCategory(category as string)) {
    return <Navigate to={'/not-found'} />;
  }

  // load data and add logic

  return (
    <div>
      <Heading
        tag="h1"
        title={CATALOG_TITLES[category as ProductCategory]}
      />

      <div>Catalog page</div>
    </div>
  );
};
