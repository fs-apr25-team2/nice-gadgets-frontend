/* eslint-disable react/prop-types */
import { useAuth } from '../../context/useAuth';
import { useTranslation } from 'react-i18next';
import './UserSidebar.scss';

type Props = {
  onClose: () => void;
};

export const UserSidebar: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
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
        <p className="user-sidebar__name">
          {user?.displayName || t('form.label.name')}
        </p>
        <p className="user-sidebar__email">{user?.email}</p>
      </div>

      <nav className="user-sidebar__nav">
        {[...Array(2)].map((_, i) => (
          <button
            key={i}
            className="user-sidebar__nav-item"
          >
            {t('sideBar.purchaseHistory')}
          </button>
        ))}
      </nav>

      <div className="user-sidebar__promo">
        <p className="user-sidebar__promo-label">{t('sideBar.nextPurchase')}</p>
        <p className="user-sidebar__promo-code">PROMO CODE 12345</p>
      </div>

      <button
        className="user-sidebar__logout"
        onClick={handleLogout}
      >
        {t('buttons.actions.logoutBtn')}
      </button>
    </aside>
  );
};
