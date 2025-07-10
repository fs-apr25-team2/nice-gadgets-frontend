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
    if (product) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleAddToFavourites = (product: Product) => {
    if (product) {
      setFavouritesItems((prev) => [...prev, product]);
    }
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
        />
      ))}
    </div>
  );
};
