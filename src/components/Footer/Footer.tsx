import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { THEME_KEY } from '../../constants';
import { Theme } from '../../types/types';
import { ArrowUpIcon } from '../../ui/icons/ArrowUpIcon';

import './Footer.scss';

export const Footer = () => {
  const { t } = useTranslation();
  const [theme] = useLocalStorage<Theme>(THEME_KEY, Theme.Light);

  return (
    <footer className="footer">
      <div className="footer__container page-container">
        <NavLink
          to="/"
          aria-label="Go to homepage"
        >
          <img
            className="footer__logo"
            src={
              theme === Theme.Dark ? '/logo/Logo-dark.svg' : '/logo/Logo.svg'
            }
            alt="Nice & Gadgets logo"
          />
        </NavLink>

        <nav className="footer__nav">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/fs-apr25-team2/nice-gadgets-frontend"
            className="footer__link typography typography--uppercase"
          >
            {t('navLink.gitHub')}
          </a>
          <NavLink
            to="contacts"
            className="footer__link typography typography--uppercase"
          >
            {t('navLink.contacts')}
          </NavLink>

          <NavLink
            to="rights"
            className="footer__link typography typography--uppercase"
          >
            {t('navLink.rights')}
          </NavLink>
        </nav>

        <div className="footer__back">
          <button
            className="footer__back"
            aria-label="Scroll back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>{t('buttons.actions.toTop')}</span>
            <span className="footer__back-btn">
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
