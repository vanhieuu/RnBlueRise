import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';

import {resources} from './locales';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',

  async: true, // flags below detection to be async
  detect: (callback: any) => {
    callback('vi_VN');
  },
  init: ({}) => {},
  cacheUserLanguage: () => {},
};
/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi_VN',
    compatibilityJSON: 'v3',
    resources: resources,

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
