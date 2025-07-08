import { useNavigate } from 'react-router';
import DinoGame from 'react-chrome-dino-ts';
import 'react-chrome-dino-ts/index.css';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found__title">404 - Page Not Found</h1>
      <p className="not-found__text">But hey, you can still play {':)'}</p>

      <div className="not-found__game">
        <DinoGame />
      </div>

      <button
        className="not-found__btn"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};
