import { GoBack } from '../../ui/components/GoBack';
import './RightsPage.scss';
import { useTranslation } from 'react-i18next';

export const RightsPage = () => {
  const { t } = useTranslation();

  const rightsList = t('rights.list', { returnObjects: true }) as Array<{
    id: string;
    title: string;
    content: string;
  }>;

  return (
    <div className="rights__wrapper">
      <GoBack />

      <h1 className="rights__title">{t('rights.title')}</h1>

      <p className="rights__text">{t('rights.text')}</p>

      {rightsList.map(({ title, content, id }) => (
        <div
          key={id}
          className="rights__section"
        >
          <h2 className="rights__section-title typography typography--h3">
            {title}
          </h2>
          <p className="rights__text">{content}</p>
        </div>
      ))}
    </div>
  );
};
