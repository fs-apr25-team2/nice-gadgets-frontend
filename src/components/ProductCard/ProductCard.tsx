import React, { useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/types';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <li className="card">
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
          selected={isInCart}
          variant="catalog"
          onClick={() => setIsInCart(!isInCart)}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>

        <AddToFavouritesButton
          selected={isFavourite}
          icon={isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
          variant="catalog"
          onClick={() => setIsFavourite(!isFavourite)}
        />
      </div>
    </li>
  );
};
