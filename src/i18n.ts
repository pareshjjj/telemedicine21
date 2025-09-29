import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import paTranslations from './locales/pa.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
      },
      pa: {
        translation: paTranslations
      }
    }
  });

export default i18n;