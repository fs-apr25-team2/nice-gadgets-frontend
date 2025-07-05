import React from 'react';
import { CatalogPage } from '../CatalogPage';
import { CatalogCategory } from '../../enums/CatalogCategory';

export const AccessoriesPage: React.FC = () => {
  return <CatalogPage catalogCategory={CatalogCategory.Accessories} />;
};
