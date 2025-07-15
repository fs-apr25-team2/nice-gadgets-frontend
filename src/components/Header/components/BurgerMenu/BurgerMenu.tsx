import { HeaderIcons } from '../HeaderIcons/HeaderIcons';
import { LangSwitcher } from '../LangSwitcher';
import { NavigationTabs } from '../NavigationTabs/NavigationTabs';
import { UserMenu } from '../UserMenu';
import './BurgerMenu.scss';

interface BurgerMenuProps {
  onClose: () => void;
}

export const BurgerMenu = ({ onClose }: BurgerMenuProps) => {
  return (
    <div className="burger-menu">
      <nav
        className="burger-menu__nav"
        aria-label="Mobile navigation"
      >
        <NavigationTabs
          direction="vertical"
          onClick={onClose}
        />
      </nav>
      <div className="burger-menu__lang">
        <LangSwitcher mobile={true} />
      </div>
      <div className="burger-menu__user">
        <UserMenu />
      </div>
      <div className="burger-menu__icons">
        <HeaderIcons onClick={onClose} />
      </div>
    </div>
  );
};
