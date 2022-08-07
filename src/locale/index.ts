import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';

export default createI18n({
  locale: localStorage.getItem('locale') || navigator.language,
  // silentFallbackWarn: true,
  // silentTranslationWarn: true,
  fallbackLocale: {
    'ru-RU': ['ru'],
    default: ['en'],
  },
  messages: {
    en,
    ru,
    de: {},
    ar: {},
  },
});
