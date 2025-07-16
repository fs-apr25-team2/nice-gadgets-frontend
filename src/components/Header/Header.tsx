import { NavLink } from 'react-router';
import { useState } from 'react';

import { BurgerMenu } from './components/BurgerMenu';
import { NavigationTabs } from './components/NavigationTabs';
import { HeaderIcons } from './components/HeaderIcons';
import { LangSwitcher } from './components/LangSwitcher';

import { BurgerMenuIcon } from '../../ui/icons/BurgerMenuIcon';
import { CloseIcon } from '../../ui/icons/CloseIcon';

import './Header.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
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
              src="/logo/Logo.svg"
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
        </div>
      </div>

      {isMenuOpen && <BurgerMenu onClose={handleCloseMenu} />}
    </header>
  );
};
