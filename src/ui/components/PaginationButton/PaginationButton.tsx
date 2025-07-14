import './PaginationButton.scss';
import cn from 'classnames';
import React from 'react';

type PaginationButtonProps = {
  selected?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isArrow?: boolean;
};

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  selected = false,
  children = 'Button',
  onClick,
  disabled = false,
  isArrow = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'button',
        'button--pagination',
        'typography',
        'typography--buttons',
        {
          'button--pagination-selected': selected,
          'button--pagination-arrow': isArrow,
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
