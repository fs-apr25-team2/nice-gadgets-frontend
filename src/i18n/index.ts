import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import ua from './ua/translation.json';
import { Language } from '../types/types';

export const resources = {
  en: { translation: en },
  ua: { translation: ua },
} as const;

const fallbackLang =
  (localStorage.getItem('appLanguage') as Language) || Language.EN;

i18n.use(initReactI18next).init({
  resources,
  lng: fallbackLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  pluralSeparator: '_',
});

export default i18n;
