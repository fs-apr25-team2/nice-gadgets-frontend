import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct } from '../../types/types';
import { GoBack } from '../../ui/components/GoBack';

import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) return;

    setSubmitted(true);
    setCartItems([]);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="checkout-page">
      <GoBack />
      <div className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
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
                <Form.Label className="checkout-page__label">Name</Form.Label>
                <Form.Control asChild>
                  <input
                    className="checkout-page__input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  Please enter your name.
                </Form.Message>
              </Form.Field>

              <Form.Field
                name="phone"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  Phone Number
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
                    placeholder="Enter your phone number"
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  Please enter your phone number.
                </Form.Message>
              </Form.Field>

              <Form.Field
                name="address"
                className="checkout-page__field"
              >
                <Form.Label className="checkout-page__label">
                  Address
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
                    placeholder="Enter your delivery address"
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="checkout-page__error"
                >
                  Please enter your address.
                </Form.Message>
              </Form.Field>
            </Form.Root>
          </div>

          {cartItems.length > 0 && (
            <div className="checkout-page__summary">
              <h3>Order Summary</h3>
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
                        {item.name}
                      </span>
                      <span className="checkout-page__product-price">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            className="checkout-page__confirm"
            onClick={handleButtonClick}
          >
            Confirm Purchase — Total: ${totalPrice.toFixed(2)}
          </button>
        </div>
      : <div className="checkout-page__success">
          <h2>🎉 Thank you for your purchase!</h2>
          <p>You will be redirected shortly...</p>
        </div>
      }
    </div>
  );
};
