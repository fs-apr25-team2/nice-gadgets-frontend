import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { GiftIcon } from '../../ui/icons/GiftIcon';
import { NavLink } from 'react-router';
import './SignupOfferModal.scss';

export const SignupOfferModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user') !== null;
    const alreadyShown = localStorage.getItem('SignupOfferModal');

    if (isLoggedIn || alreadyShown) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem('SignupOfferModal', 'true');
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="signup-offer__overlay" />
        <Dialog.Content className="signup-offer__content">
          <div className="signup-offer__image-wrapper">
            <GiftIcon />
          </div>

          <Dialog.Title className="signup-offer__title">
            Sign Up For 10% Off
          </Dialog.Title>

          <Dialog.Description className="signup-offer__desc">
            Create an account now and enjoy a 10% discount on your first
            purchase
          </Dialog.Description>

          <NavLink
            className="signup-offer__login"
            to="/login"
            onClick={() => setOpen(false)}
          >
            Login
          </NavLink>

          <Dialog.Close className="signup-offer__no-thanks">
            <span>No thanks</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
