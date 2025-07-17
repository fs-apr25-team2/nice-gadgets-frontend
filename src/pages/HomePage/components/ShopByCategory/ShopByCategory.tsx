import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Product, ProductCategory } from '../../../../types/types';
import { getProducts } from '../../../../utils/api';
import './ShopByCategory.scss';

type CategoryConfig = {
  name: string;
  path: ProductCategory;
  modelsCount: number;
  image: string;
};

export const ShopByCategory: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const getCount = (category: ProductCategory) => {
    return products.filter((product) => product.category === category).length;
  };

  const categories: CategoryConfig[] = [
    {
      name: t('categories.phones'),
      path: 'phones',
      modelsCount: getCount('phones'),
      image: '/img/phones-shop-by-category.svg',
    },
    {
      name: t('categories.tablets'),
      path: 'tablets',
      modelsCount: getCount('tablets'),
      image: '/img/tablets-shop-by-category.svg',
    },
    {
      name: t('categories.accessories'),
      path: 'accessories',
      modelsCount: getCount('accessories'),
      image: '/img/accessories-shop-by-category.svg',
    },
  ];

  return (
    <section className="shop-category">
      <h2 className="shop-category__title typography typography--h2">
        {t('home.categories')}
      </h2>

      <div className="shop-category__grid">
        {categories.map(({ name, path, modelsCount, image }) => (
          <NavLink
            to={`/${path}`}
            className="shop-category__item"
            key={path}
          >
            <div className="shop-category__image-wrapper">
              <img
                src={image}
                alt={name}
                className="shop-category__image"
              />
            </div>

            <div className="shop-category__info">
              <p className="shop-category__name typography typography--h4">
                {name}
              </p>

              <p className="shop-category__models typography typography--small">
                {t('home.models.total', { count: modelsCount })}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};
