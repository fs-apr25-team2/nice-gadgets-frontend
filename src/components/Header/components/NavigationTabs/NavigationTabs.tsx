import { NavLink } from 'react-router';
import cn from 'classnames';
import './NavigationTabs.scss';

interface NavigationTabsProps {
  direction?: 'horizontal' | 'vertical';
  onClick?: () => void;
}

export const NavigationTabs = ({
  direction = 'horizontal',
  onClick,
}: NavigationTabsProps) => {
  const tabs = [
    { to: '/', label: 'Home' },
    { to: '/phones', label: 'Phones' },
    { to: '/tablets', label: 'Tablets' },
    { to: '/accessories', label: 'Accessories' },
  ];

  return (
    <ul
      className={cn('nav-tabs', {
        'nav-tabs--horizontal': direction === 'horizontal',
        'nav-tabs--vertical': direction === 'vertical',
      })}
    >
      {tabs.map(({ to, label }) => (
        <li
          key={to}
          className="nav-tabs__item"
        >
          <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
              `nav-link typography typography--uppercase ${
                isActive ? 'active' : ''
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
