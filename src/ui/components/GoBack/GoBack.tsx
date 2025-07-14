import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '../../../ui/icons/ArrowLeftIcon';
import './GoBack.scss';

export const GoBack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      className="backButton"
      onClick={() => navigate(-1)}
    >
      {ArrowLeftIcon()}
      <span className="backButton__text">{t('buttons.actions.back')}</span>
    </button>
  );
};
