import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // загружает переводы с сервера
  .use(LanguageDetector) // автоматически определяет язык пользователя
  .use(initReactI18next) // подключает i18n к react
  .init({
    fallbackLng: 'ua', // язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // не требуется для React
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // путь для загрузки переводов
    },
  });

export default i18n;
