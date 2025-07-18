import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct } from '../../types/types';
import { GoBack } from '../../ui/components/GoBack';
import { useAuth } from '../../context/auth/useAuth';
import { useTranslation } from 'react-i18next';

import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: isAuthenticated ? user?.displayName || '' : '',
    email: isAuthenticated ? user?.email || '' : '',
    phone: '',
    address: '',
  });

  const discountRate = isAuthenticated ? 0.1 : 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const discountAmount = subtotal * discountRate;
  const totalPrice = subtotal - discountAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      return;
    }

    setSubmitted(true);
    setCartItems([]);

    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <div className="checkout-page">
      <GoBack />
      <div className="checkout-page__header">
        <h1 className="checkout-page__title">
          {t('checkout.title', 'Checkout')}
        </h1>
      </div>

      {!submitted ?
        <div className="checkout-page__content">
          <div className="checkout-page__form-section">
            <Form.Root
              className="checkout-page__form"
              id="checkout-form"
            >
              <Form.Field
                name="name"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  {t('checkout.form.name', 'Name')}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="checkout-page__input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder={t(
                      'checkout.form.namePlaceholder',
                      'Enter your full name',
                    )}
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  {t(
                    'checkout.form.errors.nameRequired',
                    'Please enter your name.',
                  )}
                </Form.Message>
              </Form.Field>

              <Form.Field
                name="email"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  {t('checkout.form.email', 'Email')}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="checkout-page__input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder={t(
                      'checkout.form.emailPlaceholder',
                      'Enter your email',
                    )}
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  {t(
                    'checkout.form.errors.emailRequired',
                    'Please enter your email.',
                  )}
                </Form.Message>
              </Form.Field>

              <Form.Field
                name="phone"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  {t('checkout.form.phone', 'Phone Number')}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="checkout-page__input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    placeholder={t(
                      'checkout.form.phonePlaceholder',
                      'Enter your phone number',
                    )}
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  {t(
                    'checkout.form.errors.phoneRequired',
                    'Please enter your phone number.',
                  )}
                </Form.Message>
              </Form.Field>

              <Form.Field
                name="address"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  {t('checkout.form.address', 'Address')}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="checkout-page__input"
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    autoComplete="street-address"
                    placeholder={t(
                      'checkout.form.addressPlaceholder',
                      'Enter your delivery address',
                    )}
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  {t(
                    'checkout.form.errors.addressRequired',
                    'Please enter your address.',
                  )}
                </Form.Message>
              </Form.Field>
            </Form.Root>
          </div>

          {cartItems.length > 0 && (
            <div className="checkout-page__summary">
              <h3>{t('checkout.summary.title', 'Order Summary')}</h3>
              <ul className="checkout-page__product-list">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="checkout-page__product-item"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-page__product-image"
                    />
                    <div className="checkout-page__product-info">
                      <span className="checkout-page__product-name">
                        {item.quantity && item.quantity > 1 ?
                          `${item.quantity} × ${item.name}`
                        : item.name}
                      </span>
                      <span className="checkout-page__product-price">
                        ${((item.quantity || 1) * item.price).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {isAuthenticated ?
                <div className="checkout-page__discount-banner checkout-page__discount-banner--auth">
                  {t(
                    'checkout.discount.loggedIn',
                    'You’re logged in! A 10% discount has been applied to your total.',
                  )}
                </div>
              : <div
                  className="checkout-page__discount-banner checkout-page__discount-banner--promo"
                  onClick={() => navigate('/login')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate('/login');
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  aria-label={t(
                    'checkout.discount.loginAria',
                    'Log in to get 10% off your order',
                  )}
                >
                  {t(
                    'checkout.discount.login',
                    'Log in to get 10% off your order!',
                  )}
                </div>
              }

              <div className="checkout-page__totals">
                {isAuthenticated && (
                  <p>
                    {t('checkout.totals.subtotal', 'Subtotal')}: $
                    {subtotal.toFixed(2)}
                  </p>
                )}
                {isAuthenticated && (
                  <p>
                    {t('checkout.totals.discount', 'Discount')}: -$
                    {discountAmount.toFixed(2)}
                  </p>
                )}
                <p className="checkout-page__totals-final">
                  {t('checkout.totals.total', 'Total')}: $
                  {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="checkout-page__confirm"
            onClick={handleButtonClick}
          >
            {t('checkout.button.confirmPurchase', 'Confirm Purchase')}
          </button>
        </div>
      : <div className="checkout-page__success">
          <h2>
            🎉 {t('checkout.success.thankYou', 'Thank you for your purchase!')}
          </h2>
          <p>
            {t(
              'checkout.success.redirect',
              'You will be redirected shortly...',
            )}
          </p>
        </div>
      }
    </div>
  );
};
