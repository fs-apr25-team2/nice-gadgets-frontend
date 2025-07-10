import React from 'react';
import { useNavigate } from 'react-router';
import './ProductCard.scss';
import { Product } from '../../types/types';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';

type Props = {
  product: Product;
  isInCart: (product: Product) => boolean;
  isAddedToFavourites: (product: Product) => boolean;
  addToCart: (product: Product) => void;
  addToFavourites: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeFromFavourites: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isInCart,
  isAddedToFavourites,
  addToCart,
  addToFavourites,
  removeFromCart,
  removeFromFavourites,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <li
      className="card"
      onClick={handleCardClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="card__image"
      />

      <h3 className="card__title">{product.name}</h3>

      <p className="card__price">
        ${product.price}
        <span className="card__price--old">${product.fullPrice}</span>
      </p>

      <ul className="card__specs">
        <li className="card__spec">
          <span className="card__spec-label">Screen</span>
          <span className="card__spec-value">{product.screen}</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">Capacity</span>
          <span className="card__spec-value">{product.capacity}</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">RAM</span>
          <span className="card__spec-value">{product.ram}</span>
        </li>
      </ul>

      <div className="card__actions">
        <Button
          selected={isInCart(product)}
          variant="catalog"
          onClick={(event) => {
            if (event) {
              event.stopPropagation();
            }

            if (isInCart(product)) {
              removeFromCart(product);
            } else {
              addToCart(product);
            }
          }}
        >
          {isInCart(product) ? 'Added' : 'Add to cart'}
        </Button>

        <AddToFavouritesButton
          selected={isAddedToFavourites(product)}
          icon={
            isAddedToFavourites(product) ? <HeartFilledIcon /> : <HeartIcon />
          }
          variant="catalog"
          onClick={(event) => {
            if (event) {
              event.stopPropagation();
            }

            if (isAddedToFavourites(product)) {
              removeFromFavourites(product);
            } else {
              addToFavourites(product);
            }
          }}
        />
      </div>
    </li>
  );
};
