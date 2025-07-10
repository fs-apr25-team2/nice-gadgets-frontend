import React, { useState } from 'react';
import './ProductCard.scss';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';

export const ProductCard: React.FC = () => {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <div className="card">
      <img
        src="https://via.placeholder.com/150"
        alt="Apple iPhone 14 Pro"
        className="card__image"
      />

      <h3 className="card__title">Apple iPhone 14 Pro 128GB Silver (MQ023)</h3>

      <p className="card__price">
        $999<span className="card__price--old">$1199</span>
      </p>

      <ul className="card__specs">
        <li className="card__spec">
          <span className="card__spec-label">Screen</span>
          <span className="card__spec-value">6.1” OLED</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">Capacity</span>
          <span className="card__spec-value">128 GB</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">RAM</span>
          <span className="card__spec-value">6 GB</span>
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
    </div>
  );
};
