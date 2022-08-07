import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default function () {
  const i18n = useI18n();
  const locale = i18n.locale;

  watch(locale, () => {
    localStorage.setItem('locale', locale.value);
  });

  const getLanguageName = (localeCode: string): string => {
    const displayNames = new Intl.DisplayNames(localeCode, {
      type: 'language',
      languageDisplay: 'dialect',
    });

    return displayNames.of(localeCode);
  };

  return { i18n, getLanguageName };
}
