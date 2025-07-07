import './AddToFavouritesButton.scss';
import cn from 'classnames';
import React from 'react';

type AddToFavouritesButtonProps = {
  selected?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const AddToFavouritesButton: React.FC<AddToFavouritesButtonProps> = ({
  selected = false,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn('button', 'button--favourites', {
        'button--favourites-selected': selected,
      })}
      onClick={onClick}
    >
      {icon}
    </button> //  <AddToFavouritesButton selected={isFavourite} icon={isFavourite ? <HeartFilledIcon /> : <HeartIcon />} ...
  );
};
