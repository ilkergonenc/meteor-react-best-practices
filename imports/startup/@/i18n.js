import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import yaml from 'js-yaml';

const defaultLang = 'en';

const options = {
  lng: 'tr',
  lang: 'tr',
  fallbackLng: 'en',
  supportedLngs: ['en', 'tr'],
  preload: ['en'],
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  // saveMissing: true,
  // debug: true,

  backend: {
    loadPath: '/i18n/{{lng}}/{{ns}}.yml',
    parse: function(data) { return yaml.load(data) },
  },

  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  useSuspense: process && !process.release,
};

// for browser use http backend to load translations and browser lng detector
if (process && !process.release) {
  i18n.use(Backend).use(initReactI18next).use(LanguageDetector);
}

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
export { defaultLang };