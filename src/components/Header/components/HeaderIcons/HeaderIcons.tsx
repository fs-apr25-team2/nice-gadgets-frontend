import { NavLink } from 'react-router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

import { HeartIcon } from '../../../../ui/icons/HeartIcon';
import { ShoppingCartIcon } from '../../../../ui/icons/ShoppingCartIcon';
import { CartProduct, Product } from '../../../../types/types';
import { CART_KEY, FAVOURITES_KEY } from '../../../../constants';

import './HeaderIcons.scss';

interface HeaderIconsProps {
  onClick?: () => void;
}

export const HeaderIcons = ({ onClick }: HeaderIconsProps) => {
  const [favouritesItems] = useLocalStorage<Product[]>(FAVOURITES_KEY, []);
  const [cartItems] = useLocalStorage<CartProduct[]>(CART_KEY, []);

  const totalCartQuantity = cartItems.reduce(
    (total, cartItem) => total + (cartItem.quantity || 1),
    0,
  );

  return (
    <div className="header-icons">
      <NavLink
        to="/favourites"
        className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}
        aria-label="Favourites"
        onClick={onClick}
      >
        <HeartIcon />

        {favouritesItems.length > 0 && (
          <span className="icon-badge">{favouritesItems.length}</span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}
        aria-label="Cart"
        onClick={onClick}
      >
        <ShoppingCartIcon />
        {totalCartQuantity > 0 && (
          <span className="icon-badge">{totalCartQuantity}</span>
        )}
      </NavLink>
    </div>
  );
};
