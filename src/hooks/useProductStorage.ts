import { CartProduct, Product } from '../types/types';
import { useLocalStorage } from './useLocalStorage';

export const useProductStorage = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const [favouritesItems, setFavouritesItems] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

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

  return {
    isInCart,
    isAddedToFavourites,
    addToCart,
    removeFromCart,
    addToFavourites,
    removeFromFavourites,
  };
};
