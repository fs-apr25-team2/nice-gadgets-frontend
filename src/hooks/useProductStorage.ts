import { toast } from 'react-toastify';
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
      toast.dismiss(`cart-add-${product.id}`);
      toast.dismiss(`cart-remove-${product.id}`);
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart`, {
        toastId: `cart-add-${product.id}`,
        className: 'toast-add-and-remove',
      });
    }
  };

  const removeFromCart = (product: Product) => {
    toast.dismiss(`cart-add-${product.id}`);
    toast.dismiss(`cart-remove-${product.id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
    toast.error(`${product.name} removed from cart`, {
      toastId: `cart-remove-${product.id}`,
      className: 'toast-add-and-remove',
    });
  };

  const addToFavourites = (product: Product) => {
    if (!isAddedToFavourites(product)) {
      toast.dismiss(`fav-add-${product.id}`);
      toast.dismiss(`fav-remove-${product.id}`);
      setFavouritesItems((prev) => [...prev, product]);
      toast.success(`${product.name} added to favourites`, {
        toastId: `fav-add-${product.id}`,
        className: 'toast-add-and-remove',
      });
    }
  };

  const removeFromFavourites = (product: Product) => {
    toast.dismiss(`fav-add-${product.id}`);
    toast.dismiss(`fav-remove-${product.id}`);
    setFavouritesItems((prev) => prev.filter((item) => item.id !== product.id));
    toast.error(`${product.name} removed from favourites`, {
      toastId: `fav-remove-${product.id}`,
      className: 'toast-add-and-remove',
    });
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
