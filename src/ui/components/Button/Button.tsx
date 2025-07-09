import './Button.scss';
import cn from 'classnames';
import React from 'react';

type ButtonProps = {
  selected?: boolean;
  variant?: 'home' | 'catalog' | 'product' | 'cart' | 'favourites';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  selected = false,
  children = 'Button',
  variant = 'home',
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn('button', 'button--primary', `button--${variant}`, {
        'button--primary-selected': selected,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
