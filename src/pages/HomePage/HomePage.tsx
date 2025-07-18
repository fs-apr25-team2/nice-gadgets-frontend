import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductSlider } from '../../components/ProductSlider';
import { Hero } from '../../components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/types';
import { useProductStorage } from '../../hooks/useProductStorage';

import './HomePage.scss';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isInCart,
    isAddedToFavourites,
    addToCart,
    removeFromCart,
    addToFavourites,
    removeFromFavourites,
  } = useProductStorage();

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
      });
  }, []);

  const brandNewProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes('iphone 13') ||
        product.name.toLowerCase().includes('iphone 14'),
    )
    .slice(0, 10);

  const hotPriceProducts = [...products]
    .filter((product) => product.fullPrice > product.price)
    .sort((firstProduct, secondProduct) => {
      const firstDiscount = firstProduct.fullPrice - firstProduct.price;
      const secondDiscount = secondProduct.fullPrice - secondProduct.price;
      return secondDiscount - firstDiscount;
    })
    .slice(0, 12);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Hero />

      <ProductSlider
        title={t('slider.newModels')}
        products={brandNewProducts}
        isInCart={isInCart}
        isAddedToFavourites={isAddedToFavourites}
        addToCart={addToCart}
        addToFavourites={addToFavourites}
        removeFromCart={removeFromCart}
        removeFromFavourites={removeFromFavourites}
      />

      <ShopByCategory />

      <ProductSlider
        title={t('slider.hotPrices')}
        products={hotPriceProducts}
        isInCart={isInCart}
        isAddedToFavourites={isAddedToFavourites}
        addToCart={addToCart}
        addToFavourites={addToFavourites}
        removeFromCart={removeFromCart}
        removeFromFavourites={removeFromFavourites}
      />
    </>
  );
};
