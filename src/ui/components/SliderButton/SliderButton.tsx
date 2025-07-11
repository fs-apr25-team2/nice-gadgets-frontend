import './SliderButton.scss';
import cn from 'classnames';
import React from 'react';

type SliderButtonProps = {
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const SliderButton: React.FC<SliderButtonProps> = ({
  disabled = false,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn('button', 'button--slider', className, {
        'button--slider-disabled': disabled,
      })}
      onClick={onClick}
    >
      {icon}
    </button> // в компоненті <SliderButton icon={<ArrowRightIcon />} />
  );
};
