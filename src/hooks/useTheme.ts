import { watch, ref } from 'vue';

export enum Theme {
  light,
  dark,
  system,
}

const theme = ref<Theme>();

const handleThemeChange = new Map<Theme, () => void>();

handleThemeChange.set(Theme.light, () => {
  document.documentElement.classList.remove('dark');
});

handleThemeChange.set(Theme.dark, () => {
  document.documentElement.classList.add('dark');
});

handleThemeChange.set(Theme.system, () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

watch(theme, (value) => {
  if (value !== undefined) {
    handleThemeChange.get(value)!();
    localStorage.theme = value;
  }
});

const parsedTheme = localStorage.getItem('theme');

if (parsedTheme !== null) {
  theme.value = Number.parseInt(parsedTheme);
} else {
  theme.value = Theme.system;
}

export default function () {
  return { theme, Theme };
}
