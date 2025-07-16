import { useAuth } from '../../context/useAuth';
import './UserSidebar.scss';

type Props = {
  onClose: () => void;
};

// eslint-disable-next-line react/prop-types
export const UserSidebar: React.FC<Props> = ({ onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <aside className="user-sidebar">
      <button
        className="user-sidebar__close"
        onClick={onClose}
      >
        ×
      </button>

      <div className="user-sidebar__info">
        <img
          src={user?.photoURL || '/img/default-user.png'}
          alt="avatar"
          className="user-sidebar__avatar"
        />
        <p className="user-sidebar__name">{user?.displayName || 'User'}</p>
        <p className="user-sidebar__email">{user?.email}</p>
      </div>

      <button
        className="user-sidebar__logout"
        onClick={handleLogout}
      >
        Вийти
      </button>
    </aside>
  );
};
