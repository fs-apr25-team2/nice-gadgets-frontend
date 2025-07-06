import React from 'react';
import './CatalogPage.scss';
import { CatalogCategory } from '../../enums/CatalogCategory';
import { Heading } from '../../ui/components/Heading';

type Props = {
  catalogCategory: CatalogCategory;
};

export const CatalogPage: React.FC<Props> = ({ catalogCategory }) => {
  return (
    <div>
      <Heading
        tag="h1"
        title={catalogCategory}
      />

      <div>Catalog page</div>
    </div>
  );
};
