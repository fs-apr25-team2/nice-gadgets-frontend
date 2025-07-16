import * as Dialog from '@radix-ui/react-dialog';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { GiftIcon } from '../../ui/icons/GiftIcon';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import './SignupOfferModal.scss';

export const SignupOfferModal = () => {
  const [open, setOpen] = useState(false);

  const [user] = useLocalStorage('user', null);
  const [alreadyShown, setAlreadyShown] = useLocalStorage<string | null>(
    'SignupOfferModal',
    null,
  );
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    if (isLoggedIn || alreadyShown) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
      setAlreadyShown('true');
    }, 30000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, alreadyShown, setAlreadyShown]);

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

          <Dialog.Close className="signup-offer__close">
            <CloseIcon />
          </Dialog.Close>

          <Dialog.Title className="signup-offer__title">
            Sign Up For 10% Off
          </Dialog.Title>

          <Dialog.Description className="signup-offer__desc">
            Create an account now and enjoy a 10% discount on your first
            purchase
          </Dialog.Description>

          <NavLink
            className="signup-offer__login"
            to="/register"
            onClick={() => setOpen(false)}
          >
            Register
          </NavLink>

          <Dialog.Close className="signup-offer__no-thanks">
            <span>No thanks</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
