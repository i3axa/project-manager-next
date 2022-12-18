declare namespace Intl {
  class Locale {
    constructor(locales?: string | string[]);

    public readonly language;
  }

  interface IDisplayNamesOptions {
    localeMatcher?: 'lookup' | 'best fit';
    style?: 'narrow' | 'short' | 'long';
    type:
      | 'calendar'
      | 'currency'
      | 'dateTimeField'
      | 'language'
      | 'region'
      | 'script';
    languageDisplay?: 'dialect' | 'standard';
    fallback?: 'code' | 'none';
  }

  class DisplayNames {
    constructor(locales?: string | string[], options: IDisplayNamesOptions);

    public of(locale?: string): string;
  }
}
