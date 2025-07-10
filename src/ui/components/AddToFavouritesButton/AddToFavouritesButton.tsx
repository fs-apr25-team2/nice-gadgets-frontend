import './AddToFavouritesButton.scss';
import cn from 'classnames';
import React from 'react';

type AddToFavouritesButtonProps = {
  selected?: boolean;
  variant?: 'home' | 'catalog' | 'product' | 'cart' | 'favourites';
  icon: React.ReactNode;
  onClick?: () => void;
};

export const AddToFavouritesButton: React.FC<AddToFavouritesButtonProps> = ({
  selected = false,
  variant,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn(
        'button',
        'button--favourites',
        `button--favourites--${variant}`,
        {
          'button--favourites-selected': selected,
        },
      )}
      onClick={onClick}
    >
      {icon}
    </button> //  <AddToFavouritesButton selected={isFavourite} icon={isFavourite ? <HeartFilledIcon /> : <HeartIcon />} ...
  );
};
