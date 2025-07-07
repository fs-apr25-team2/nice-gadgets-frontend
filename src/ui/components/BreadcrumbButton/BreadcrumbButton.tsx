import './BreadcrumbButton.scss';
import React from 'react';

type BreadcrumbButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactNode;
};

export const BreadcrumbButton: React.FC<BreadcrumbButtonProps> = ({
  children,
  onClick,
  icon,
}) => {
  return (
    <button
      type="button"
      className="button button--breadcrumb"
      onClick={onClick}
    >
      <span className="button__breadcrumb-icon">{icon}</span>
      <span className="button__breadcrumb-text">{children}</span>
    </button>
  );
};
