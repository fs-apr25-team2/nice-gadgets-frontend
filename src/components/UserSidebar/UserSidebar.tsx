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

      <nav className="user-sidebar__nav">
        {[...Array(2)].map((_, i) => (
          <button
            key={i}
            className="user-sidebar__nav-item"
          >
            PRODUCT HISTORY
          </button>
        ))}
      </nav>

      <div className="user-sidebar__promo">
        <p className="user-sidebar__promo-label">For your next purchase</p>
        <p className="user-sidebar__promo-code">PROMO CODE 12345</p>
      </div>

      <button
        className="user-sidebar__logout"
        onClick={handleLogout}
      >
        Log out
      </button>
    </aside>
  );
};
