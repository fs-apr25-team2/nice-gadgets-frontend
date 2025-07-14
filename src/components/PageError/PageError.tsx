import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/components/Button';
import './PageError.scss';

export const PageError = () => {
  const { t } = useTranslation();

  return (
    <div className="page__error">
      <img
        className="page__error__img"
        src="/img/error.png"
        alt="Something went wrong"
      />
      <h2 className="page__error__title">{t('error.unknown')}</h2>
      <Button
        variant="reload"
        onClick={() => window.location.reload()}
      >
        {t('buttons.actions.reload')}
      </Button>
    </div>
  );
};
