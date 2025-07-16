import { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import cn from 'classnames';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { THEME_KEY } from '../../../../constants';
import { Theme } from '../../../../types/types';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, Theme.Light);

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div
      className={'theme-switcher'}
      onClick={toggleTheme}
    >
      <div
        className={cn('switch', {
          'switch--dark': theme === Theme.Dark,
        })}
      >
        <FaSun className="switch__icon switch__icon--sun" />
        <FaMoon className="switch__icon switch__icon--moon" />
        <div className="switch__thumb" />
      </div>
    </div>
  );
};
