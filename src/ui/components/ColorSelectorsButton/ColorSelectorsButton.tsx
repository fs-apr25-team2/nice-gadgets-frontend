import './ColorSelectorsButton.scss';
import cn from 'classnames';
import React from 'react';

type ColorSelectorsButtonProps = {
  selected?: boolean;
  color: string;
  onClick?: () => void;
};

export const ColorSelectorsButton: React.FC<ColorSelectorsButtonProps> = ({
  selected = false,
  color,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn('button', 'button--color', {
        'button--color-selected': selected,
      })}
      onClick={onClick}
    >
      <span className={cn('button__color-circle', `${color}`)} />
    </button>
  );
};
