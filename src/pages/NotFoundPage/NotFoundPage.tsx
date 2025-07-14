import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="not-found">
      <h1 className="not-found__title">{t('404.title')}</h1>

      <p className="not-found__text">
        {isSmallScreen ? t('404.textNotAvailable') : t('404.text')}
      </p>

      {!isSmallScreen && (
        <div className="not-found__game">
          <iframe
            src="https://kculmback.github.io/react-chrome-dino-ts/"
            width="600"
            height="270"
            style={{ border: 'none' }}
            title="local-dino"
            tabIndex={-1}
          />
        </div>
      )}

      <button
        className="not-found__btn"
        onClick={() => navigate('/')}
      >
        {t('buttons.actions.goHome')}
      </button>
    </div>
  );
};
