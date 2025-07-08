import { NavLink } from 'react-router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

import { HeartIcon } from '../../../../ui/icons/HeartIcon';
import { ShoppingCartIcon } from '../../../../ui/icons/ShoppingCartIcon';

import './HeaderIcons.scss';

interface HeaderIconsProps {
  onClick?: () => void;
}

export const HeaderIcons = ({ onClick }: HeaderIconsProps) => {
  const [favourites] = useLocalStorage<string[]>('favourites', []);
  const [cart] = useLocalStorage<string[]>('cart', []);

  return (
    <div className="header-icons">
      <NavLink
        to="/favourites"
        className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}
        aria-label="Favourites"
        onClick={onClick}
      >
        <HeartIcon />

        {favourites.length > 0 && (
          <span className="icon-badge">{favourites.length}</span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}
        aria-label="Cart"
        onClick={onClick}
      >
        <ShoppingCartIcon />
        {cart.length > 0 && <span className="icon-badge">{cart.length}</span>}
      </NavLink>
    </div>
  );
};
