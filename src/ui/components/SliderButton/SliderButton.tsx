import './SliderButton.scss';
import cn from 'classnames';
import React from 'react';

type SliderButtonProps = {
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const SliderButton: React.FC<SliderButtonProps> = ({
  disabled = false,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn('button', 'button--slider', {
        'button--slider-disabled': disabled,
      })}
      onClick={onClick}
    >
      {icon}
    </button> // в компоненті <SliderButton icon={<ArrowRightIcon />} />
  );
};
