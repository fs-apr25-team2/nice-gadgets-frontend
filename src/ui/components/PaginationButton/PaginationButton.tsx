import './PaginationButton.scss';
import cn from 'classnames';
import React from 'react';

type PaginationButtonProps = {
  selected?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  selected = false,
  children = 'Button',
  onClick,
}) => {
  return (
    <button
      type="button"
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
