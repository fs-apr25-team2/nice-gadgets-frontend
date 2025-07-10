import './ProductNotFound.scss';

export const ProductNotFound = () => (
  <div className="product-not-found">
    <img
      className="product-not-found__img"
      src="/img/product-not-found.png"
      alt="Product not found"
    />
    <h2 className="typography typography--h2 product-not-found__title">
      Product was not found
    </h2>
  </div>
);
