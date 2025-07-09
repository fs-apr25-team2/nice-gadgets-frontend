import './BreadcrumbButton.scss';
import React from 'react';

type BreadcrumbButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactNode;
  iconColor?: string;
};

export const BreadcrumbButton: React.FC<BreadcrumbButtonProps> = ({
  children,
  onClick,
  icon,
  iconColor,
}) => {
  return (
    <button
      type="button"
      className="button button--breadcrumb"
      onClick={onClick}
    >
      <span
        className="button__breadcrumb-icon"
        style={{ color: iconColor }}
      >
        {icon}
      </span>
      <span className="button__breadcrumb-text">{children}</span>
    </button>
  );
};
