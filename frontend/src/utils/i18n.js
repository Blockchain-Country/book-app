import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLang from '../locales/en/en.json'
import esLang from '../locales/es/es.json'

i18n.use(initReactI18next).init({
  // the translations
  // (tip move them in a JSON file and import them,
  // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
  resources: {
    en: {
      translation: enLang,
    },
    es: {
      translation: esLang,
    },
  },
  lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
})

export default i18n

// function App() {
//   const { t } = useTranslation();

//   return <h2>{t('Welcome to React')}</h2>;
// }

// // append app to dom
// const root = createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );
