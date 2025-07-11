import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider';
import { Hero } from '../../components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { getProducts } from '../../utils/api';
import { Product, CartProduct } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const [favouritesItems, setFavouritesItems] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const isInCart = (product: Product) => {
    return cartItems.some((item) => item.id === product.id);
  };

  const isAddedToFavourites = (product: Product) => {
    return favouritesItems.some((item) => item.id === product.id);
  };

  const addToCart = (product: Product) => {
    if (!isInCart(product)) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  const addToFavourites = (product: Product) => {
    if (!isAddedToFavourites(product)) {
      setFavouritesItems((prev) => [...prev, product]);
    }
  };

  const removeFromFavourites = (product: Product) => {
    setFavouritesItems((prev) => prev.filter((item) => item.id !== product.id));
  };

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
