import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct } from '../../types/types';
import { GoBack } from '../../ui/components/GoBack';
import { Button } from '../../ui/components/Button';

import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const navigate = useNavigate();

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const changeQty = (itemId: string, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ?
          { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
        : item,
      ),
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  const getItemQuantity = (itemId: string) => {
    const foundItem = cartItems.find((item) => item.itemId === itemId);

    return foundItem?.quantity;
  };

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <GoBack />
        <h1 className="cart-page__title">{t('cart.title')}</h1>
      </div>

      {cartItems.length === 0 ?
        <div className="cart-page__empty">
          <img
            src="/img/cart-is-empty.png"
            alt="Empty cart"
          />
          <h2>{t('cart.empty.title')}</h2>
          <p>{t('cart.empty.text')}</p>
          <Button
            variant="empty"
            onClick={() => navigate('/')}
          >
            {t('buttons.actions.shopping')}
          </Button>
        </div>
      : <div className="cart-page__content">
          <div className="cart-page__items">
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="cart-page__item"
              >
                <div className="cart-page__item-left">
                  <button
                    className="cart-page__remove"
                    onClick={() => removeFromCart(item.itemId)}
                  >
                    ×
                  </button>
                  <div className="cart-page__image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-page__image"
                    />
                  </div>
                  <div className="cart-page__name">{item.name}</div>
                </div>

                <div className="cart-page__item-right">
                  <div className="cart-page__controls">
                    <button
                      className="cart-page__btn"
                      disabled={getItemQuantity(item.itemId) === 1}
                      onClick={() => changeQty(item.itemId, -1)}
                    >
                      -
                    </button>
                    <span className="cart-page__qty">{item.quantity ?? 1}</span>
                    <button
                      className="cart-page__btn"
                      onClick={() => changeQty(item.itemId, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-page__price">
                    ${item.price * (item.quantity ?? 1)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <div className="cart-page__total">${total}</div>
            <div className="cart-page__label">
              {t('cart.total', { count: totalQuantity })}
            </div>
            <button
              className="cart-page__checkout"
              onClick={() => navigate('/checkout')}
            >
              {t('buttons.actions.checkout')}
            </button>
          </div>
        </div>
      }
    </div>
  );
};
