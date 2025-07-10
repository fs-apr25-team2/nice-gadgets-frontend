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
  onSelect?: (option: DropdownItem) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label = 'Default',
  options,
  onSelect,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(label);

  const handleSelect = (item: DropdownItem) => {
    setSelectedLabel(item.label);
    onSelect?.(item);
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
            onSelect={() => handleSelect(item)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
