import { Button } from '../../../../ui/components/Button';
import './ProductError.scss';

export const ProductError = () => (
  <div className="product-page__error">
    <img
      className="product-page__error__img"
      src="/img/error.png"
      alt="Something went wrong"
    />
    <h2 className="product-page__error__title">Something went wrong</h2>
    <Button
      variant="error"
      onClick={() => window.location.reload()}
    >
      Reload
    </Button>
  </div>
);
