import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';

const initialLocale = localStorage.getItem('locale') || navigator.language;
document.querySelector('html')?.setAttribute('lang', initialLocale);

export default createI18n({
  locale: initialLocale,
  silentFallbackWarn: !import.meta.env.DEV,
  silentTranslationWarn: !import.meta.env.DEV,
  legacy: false,
  fallbackLocale: {
    'ru-RU': ['ru'],
    default: ['en'],
  },
  messages: {
    en,
    ru,
  },
});
