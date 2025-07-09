import { NavLink } from 'react-router';
import { ArrowUpIcon } from '../../ui/icons/ArrowUpIcon';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <NavLink
          to="/"
          aria-label="Go to homepage"
        >
          <img
            className="footer__logo"
            src="/logo/Logo.png"
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
            Github
          </a>
          <NavLink
            to="contacts"
            className="footer__link typography typography--uppercase"
          >
            Contacts
          </NavLink>

          <NavLink
            to="rights"
            className="footer__link typography typography--uppercase"
          >
            Rights
          </NavLink>
        </nav>

        <div className="footer__back">
          <button
            className="footer__back"
            aria-label="Scroll back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Back to top</span>
            <span className="footer__back-btn">
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
