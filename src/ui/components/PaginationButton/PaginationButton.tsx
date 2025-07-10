import './PaginationButton.scss';
import cn from 'classnames';
import React from 'react';

type PaginationButtonProps = {
  selected?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  selected = false,
  children = 'Button',
  onClick,
  disabled = false,
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
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
