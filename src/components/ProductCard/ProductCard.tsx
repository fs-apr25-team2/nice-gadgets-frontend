import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './ProductCard.scss';
import { Product } from '../../types/types';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';
import { toast } from 'react-toastify';

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  const cartAddToastId = `cart-add-${product.itemId}`;
  const cartRemoveToastId = `cart-remove-${product.itemId}`;
  const favAddToastId = `fav-add-${product.itemId}`;
  const favRemoveToastId = `fav-remove-${product.itemId}`;

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
          <span className="card__spec-label">
            {t('product.specifications.screen')}
          </span>
          <span className="card__spec-value">{product.screen}</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">
            {t('product.specifications.capacity')}
          </span>
          <span className="card__spec-value">{product.capacity}</span>
        </li>
        <li className="card__spec">
          <span className="card__spec-label">
            {t('product.specifications.ram')}
          </span>
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
              toast.dismiss(cartAddToastId);
              toast.dismiss(cartRemoveToastId);
            }

            setTimeout(() => {
              if (isInCart(product)) {
                removeFromCart(product);
                toast.error(`${product.name} removed from cart`, {
                  toastId: cartRemoveToastId,
                  className: 'toast-add-and-remove',
                });
              } else {
                addToCart(product);
                toast.success(`${product.name} added to cart`, {
                  toastId: cartAddToastId,
                  className: 'toast-add-and-remove',
                });
              }
            }, 50);
          }}
        >
          {isInCart(product) ?
            t('buttons.actions.inCart')
          : t('buttons.actions.toCart')}
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
              toast.dismiss(favAddToastId);
              toast.dismiss(favRemoveToastId);
            }

            setTimeout(() => {
              if (isAddedToFavourites(product)) {
                removeFromFavourites(product);
                toast.error(`${product.name} removed from favourites`, {
                  toastId: favRemoveToastId,
                  className: 'toast-add-and-remove',
                });
              } else {
                addToFavourites(product);
                toast.success(`${product.name} added to favourites`, {
                  toastId: favAddToastId,
                  className: 'toast-add-and-remove',
                });
              }
            }, 50);
          }}
        />
      </div>
    </li>
  );
};
