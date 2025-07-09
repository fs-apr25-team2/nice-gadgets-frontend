import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
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
      <h1 className="not-found__title">404 - Page Not Found</h1>

      <p className="not-found__text">
        {isSmallScreen ?
          'This game is not available on phones :('
        : 'But hey, you can still play :)'}
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
        Go Home
      </button>
    </div>
  );
};
