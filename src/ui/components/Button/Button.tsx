import './Button.scss';
import cn from 'classnames';
import React from 'react';

type ButtonProps = {
  selected?: boolean;
  variant?: 'home' | 'catalog' | 'product' | 'cart' | 'favourites';
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  selected = false,
  children = 'Button',
  variant = 'home',
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn('button', 'button--primary', `button--${variant}`, {
        'button--primary-selected': selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
