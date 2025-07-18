import * as Dialog from '@radix-ui/react-dialog';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { GiftIcon } from '../../ui/icons/GiftIcon';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import './SignupOfferModal.scss';

export const SignupOfferModal = () => {
  const { t } = useTranslation();

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
            {t('signUpOffer.title')}
          </Dialog.Title>

          <Dialog.Description className="signup-offer__desc">
            {t('signUpOffer.text')}
          </Dialog.Description>

          <NavLink
            className="signup-offer__login"
            to="/register"
            onClick={() => setOpen(false)}
          >
            {t('signUpOffer.registerBtn')}
          </NavLink>

          <Dialog.Close className="signup-offer__no-thanks">
            <span>{t('signUpOffer.noThanks')}</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
