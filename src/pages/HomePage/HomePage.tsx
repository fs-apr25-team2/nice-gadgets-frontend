import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider';
import { Hero } from '../../components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/types';
import { useProductStorage } from '../../hooks/useProductStorage';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {
    isInCart,
    isAddedToFavourites,
    addToCart,
    removeFromCart,
    addToFavourites,
    removeFromFavourites,
  } = useProductStorage();

  useEffect(() => {
    getProducts().then(setProducts);
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

  return (
    <>
      <Hero />

      <ProductSlider
        title="Brand new models"
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
        title="Hot prices"
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
