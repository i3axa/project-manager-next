import { inject, ref, type App } from 'vue';

const injectionKey = 'themeProvider';

export enum ThemeValue {
  light,
  dark,
  system,
}

export function createTheme(): ThemeProvider {
  let themeValue: ThemeValue;

  const parsedTheme = localStorage.getItem('theme');

  if (parsedTheme !== null) {
    themeValue = Number.parseInt(parsedTheme);
  } else {
    themeValue = ThemeValue.system;
  }

  const handleThemeChange = new Map<ThemeValue, () => void>();

  handleThemeChange.set(ThemeValue.light, () => {
    document.documentElement.classList.remove('dark');
  });

  handleThemeChange.set(ThemeValue.dark, () => {
    document.documentElement.classList.add('dark');
  });

  handleThemeChange.set(ThemeValue.system, () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const themeProvider: ThemeProvider = {
    get theme() {
      return themeValue;
    },
    set theme(newValue: ThemeValue) {
      const onThemeChange = handleThemeChange.get(newValue);

      if (!onThemeChange) {
        console.warn('Can not change theme');
        return;
      }

      onThemeChange();
      localStorage.theme = newValue;
      themeValue = newValue;
    },
    install(app) {
      app.config.globalProperties.$themeProvider = themeProvider;
      app.provide(injectionKey, { themeProvider: this });
    },
  };

  themeProvider.theme = themeValue;

  return themeProvider;
}

export function useTheme() {
  const result = inject<{ themeProvider: ThemeProvider }>(injectionKey);

  if (!result) {
    throw new Error('Plugin theme is undefined');
  }

  return { themeProvider: ref(result.themeProvider) };
}

interface ThemeProvider {
  theme: ThemeValue;

  install(app: App): void;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $themeProvider: ThemeProvider;
  }
}
