import './Button.scss';
import cn from 'classnames';
import React from 'react';

type ButtonProps = {
  selected?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  selected = false,
  children = 'Button',
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn('button', 'button--primary', {
        'button--primary-selected': selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
