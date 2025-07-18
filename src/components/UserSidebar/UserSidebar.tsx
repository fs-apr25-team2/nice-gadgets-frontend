/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth/useAuth';
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

  const handleFeatureClick = () => {
    toast.info(t('sideBar.featureInDevelopment'));
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
        <button
          className="user-sidebar__nav-item"
          onClick={handleFeatureClick}
        >
          {t('sideBar.purchaseHistory')}
        </button>
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
