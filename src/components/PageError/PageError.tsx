import { Button } from '../../ui/components/Button';
import './PageError.scss';

export const PageError = () => (
  <div className="page__error">
    <img
      className="page__error__img"
      src="/img/error.png"
      alt="Something went wrong"
    />
    <h2 className="page__error__title">Something went wrong</h2>
    <Button
      variant="reload"
      onClick={() => window.location.reload()}
    >
      Reload
    </Button>
  </div>
);
