/* eslint-disable react/prop-types */
// import { useParams } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct, Product } from '../../types/types';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  // const { category, productId } = useParams();
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const [favouritesItems, setFavouritesItems] = useLocalStorage<Product[]>(
    'favourites',
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
    console.log(product);
    console.log(cartItems);
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.itemId !== product.itemId),
    );
  };

  const handleAddToFavourites = (product: Product) => {
    console.log(product);
    console.log(favouritesItems);
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
    <div className="product-list">
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
    </div>
  );
};
