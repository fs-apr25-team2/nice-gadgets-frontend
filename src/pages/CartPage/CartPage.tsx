import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router';
import { CartProduct } from '../../types/types';
import { GoBack } from '../../ui/components/GoBack';

import './CartPage.scss';

export const CartPage: React.FC = () => {
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

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <GoBack />
        <h1 className="cart-page__title">Cart</h1>
      </div>

      {cartItems.length === 0 ?
        <div className="cart-page__empty">
          <img
            src="../../../img/cart-is-empty.png"
            alt="Empty cart"
            className="cart-page__empty-img"
          />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <button
            className="cart-page__checkout"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      : <div className="cart-page__content">
          <div className="cart-page__items">
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="cart-page__item"
              >
                <button
                  className="cart-page__remove"
                  onClick={() => removeFromCart(item.itemId)}
                >
                  ×
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-page__image"
                />

                <div className="cart-page__info-block">
                  <div className="cart-page__info">
                    <div className="cart-page__name-and-controls">
                      <div className="cart-page__name">{item.name}</div>
                      <div className="cart-page__controls">
                        <button
                          className="cart-page__btn"
                          onClick={() => changeQty(item.itemId, -1)}
                        >
                          -
                        </button>
                        <span className="cart-page__qty">
                          {item.quantity ?? 1}
                        </span>
                        <button
                          className="cart-page__btn"
                          onClick={() => changeQty(item.itemId, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
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
              Total for {totalQuantity} item{totalQuantity !== 1 && 's'}
            </div>
            <button className="cart-page__checkout">Checkout</button>
          </div>
        </div>
      }
    </div>
  );
};
