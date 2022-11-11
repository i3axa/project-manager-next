import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

export const useStyleStore = defineStore('style', () => {
  const isNavbarHidden = ref(true);
  const isSyncIndicatorToggled = ref(false);
  const isGlobalSpinnerShown = ref(false);

  const setIsSyncIndicatorToggled = (value: boolean) => {
    isSyncIndicatorToggled.value = value;
    window.onbeforeunload = value
      ? () => {
          return 'Do you really want to leave?';
        }
      : null;
  };

  const setIsGlobalSpinnerShown = (value: boolean) => {
    isGlobalSpinnerShown.value = value;
  };

  const toggleNavigationBar = () => {
    const navbar = document.getElementById('navbar');
    const globalOverlay = document.getElementById('global-overlay');

    if (isNavbarHidden.value) {
      navbar!.style.left = '0';
      globalOverlay!.style.display = 'block';
    } else {
      navbar!.style.left = '-100%';
      globalOverlay!.style.display = 'none';
    }

    isNavbarHidden.value = !isNavbarHidden.value;
  };

  return {
    isNavbarHidden: readonly(isNavbarHidden),
    isSyncIndicatorToggled: readonly(isSyncIndicatorToggled),
    isGlobalSpinnerShown: readonly(isGlobalSpinnerShown),
    setIsSyncIndicatorToggled,
    setIsGlobalSpinnerShown,
    toggleNavigationBar,
  };
});
