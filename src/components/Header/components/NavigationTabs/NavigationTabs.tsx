import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const tabs = [
    { to: '/', key: 'home' },
    { to: '/phones', key: 'phones' },
    { to: '/tablets', key: 'tablets' },
    { to: '/accessories', key: 'accessories' },
  ];

  return (
    <ul
      className={cn('nav-tabs', {
        'nav-tabs--horizontal': direction === 'horizontal',
        'nav-tabs--vertical': direction === 'vertical',
      })}
    >
      {tabs.map(({ to, key }) => (
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
            {t(`navLink.${key}`)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
