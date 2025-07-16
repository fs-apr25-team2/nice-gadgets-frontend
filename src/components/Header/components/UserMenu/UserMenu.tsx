import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { GuestIcon } from '../../../../ui/icons/GuestIcon';
import { UserIcon } from '../../../../ui/icons/UserIcon';
import { NavLink } from 'react-router';

import './UserMenu.scss';

export const UserMenu = () => {
  const [user] = useLocalStorage('user', null);
  const isLoggedIn = Boolean(user);

  return (
    <div className="user-menu">
      <div className="user-menu__mobile">
        <div className="user-menu__info">
          {isLoggedIn ?
            <>
              <span className="user-menu__name">Name</span>
              <span className="user-menu__email">email</span>
            </>
          : <>
              <NavLink
                to="/login"
                className="user-menu__login-link"
              >
                Log In
              </NavLink>
            </>
          }
        </div>
      </div>

      <div className="user-menu__desktop">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `user-menu__btn ${isActive ? 'active' : ''}`
          }
        >
          {isLoggedIn ?
            <UserIcon />
          : <GuestIcon />}
        </NavLink>
      </div>
    </div>
  );
};
