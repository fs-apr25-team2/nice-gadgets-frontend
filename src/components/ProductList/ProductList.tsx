/* eslint-disable react/prop-types */
import cn from 'classnames';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct, Product } from '../../types/types';
import { ProductCard } from '../ProductCard';
import { CART_KEY, FAVOURITES_KEY } from '../../constants';
import './ProductList.scss';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductList: React.FC<Props> = ({ products, className }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>(
    CART_KEY,
    [],
  );
  const [favouritesItems, setFavouritesItems] = useLocalStorage<Product[]>(
    FAVOURITES_KEY,
    [],
  );

  const isProductInCart = (product: Product) => {
    const foundProduct = cartItems.find(
      (cartItem) => cartItem.id === product.id,
    );

    return Boolean(foundProduct);
  };

  const isProductAddedToFavourites = (product: Product) => {
    const foundProduct = favouritesItems.find(
      (favouritesItem) => favouritesItem.id === product.id,
    );

    return Boolean(foundProduct);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.itemId !== product.itemId),
    );
  };

  const handleAddToFavourites = (product: Product) => {
    setFavouritesItems((prev) => [...prev, product]);
  };

  const handleRemoveFromFavourites = (product: Product) => {
    setFavouritesItems(
      favouritesItems.filter(
        (favouritesItem) => favouritesItem.itemId !== product.itemId,
      ),
    );
  };

  return (
    <ul className={cn('product-list', className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isInCart={isProductInCart}
          isAddedToFavourites={isProductAddedToFavourites}
          addToCart={handleAddToCart}
          addToFavourites={handleAddToFavourites}
          removeFromCart={handleRemoveFromCart}
          removeFromFavourites={handleRemoveFromFavourites}
        />
      ))}
    </ul>
  );
};
