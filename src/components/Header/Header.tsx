import { NavLink } from 'react-router';
import { useState } from 'react';

import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { THEME_KEY } from '../../constants';
import { Theme } from '../../types/types';
import { BurgerMenu } from './components/BurgerMenu';
import { NavigationTabs } from './components/NavigationTabs';
import { HeaderIcons } from './components/HeaderIcons';
import { LangSwitcher } from './components/LangSwitcher';
import { UserMenu } from './components/UserMenu';

import { BurgerMenuIcon } from '../../ui/icons/BurgerMenuIcon';
import { CloseIcon } from '../../ui/icons/CloseIcon';

import './Header.scss';

export const Header = () => {
  const [theme] = useLocalStorage<Theme>(THEME_KEY, Theme.Light);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <NavLink
            to="/"
            aria-label="Go to homepage"
            className="logo-container"
          >
            <img
              className="logo"
              src={
                theme === Theme.Dark ? '/logo/Logo-dark.svg' : '/logo/Logo.svg'
              }
              alt="Nice & Gadgets logo"
            />
          </NavLink>

          <nav
            className="header__nav"
            aria-label="Main navigation"
          >
            <NavigationTabs direction="horizontal" />
          </nav>
        </div>

        <button
          className="burger"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={handleToggleMenu}
        >
          {isMenuOpen ?
            <CloseIcon />
          : <BurgerMenuIcon />}
        </button>

        <div className="header__right">
          <ThemeSwitcher />
          <LangSwitcher mobile={false} />
          <HeaderIcons />
          <UserMenu />
        </div>
      </div>

      {isMenuOpen && <BurgerMenu onClose={handleCloseMenu} />}
    </header>
  );
};
