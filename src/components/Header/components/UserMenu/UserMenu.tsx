/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestIcon } from '../../../../ui/icons/GuestIcon';
import { UserIcon } from '../../../../ui/icons/UserIcon';
import { useAuth } from '../../../../context/useAuth';
import { UserSidebar } from '../../../UserSidebar';

import './UserMenu.scss';

type UserMenuProps = {
  onClick: () => void;
};

export const UserMenu: React.FC<UserMenuProps> = ({ onClick }) => {
  const { user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      setIsSidebarOpen(true);
    } else {
      onClick();
      navigate('/login');
    }
  };

  const renderIcon = () => {
    if (!isAuthenticated) {
      return <GuestIcon />;
    }

    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="User avatar"
          className="user-menu__avatar-icon"
        />
      );
    }

    return <UserIcon />;
  };

  return (
    <>
      <div className="user-menu">
        <button
          className="user-menu__btn"
          onClick={handleClick}
        >
          {renderIcon()}
        </button>
      </div>

      {isSidebarOpen && <UserSidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};
