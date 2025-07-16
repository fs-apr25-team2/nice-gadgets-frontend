import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Language } from '../../../../types/types';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { LANG_KEY } from '../../../../constants';
import './LangSwitcher.scss';

const langMap = [Language.EN, Language.UA];

type Props = {
  mobile: boolean;
};

export const LangSwitcher: React.FC<Props> = ({ mobile }) => {
  const { i18n } = useTranslation();
  const [, setLang] = useLocalStorage<Language>(LANG_KEY, Language.EN);

  const handleLanguageChange = (lng: Language) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <div className={cn('lang-switcher', { 'lang-switcher--mobile': mobile })}>
      {langMap.map((lang, index, arr) => (
        <React.Fragment key={lang}>
          <button
            onClick={() => handleLanguageChange(lang)}
            className={cn('lang-option', {
              'lang-option--active': i18n.language === lang,
            })}
          >
            {lang}
          </button>
          {index < arr.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
