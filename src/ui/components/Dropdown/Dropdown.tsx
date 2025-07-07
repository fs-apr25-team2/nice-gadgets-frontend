/* eslint-disable react/prop-types */
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import { useState } from 'react';

import './Dropdown.scss';

type DropdownItem = {
  label: string;
  value?: string;
  disabled?: boolean;
};

interface DropdownProps {
  label?: string;
  options: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  label = 'Default',
  options,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(label);

  const handleSelect = (label: string) => {
    setSelectedLabel(label);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="dropdown-trigger">
          {selectedLabel}
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="dropdown-content"
        side="bottom"
        align="start"
      >
        {options.map((item, index) => (
          <DropdownMenu.Item
            key={index}
            className="dropdown-item"
            disabled={item.disabled}
            onSelect={() => handleSelect(item.label)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
