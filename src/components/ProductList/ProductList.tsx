/* eslint-disable react/prop-types */
import { Product } from '../../types/types';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
