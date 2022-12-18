import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

export const useStyleStore = defineStore('style', () => {
  const isNavbarHidden = ref(true);
  const isSyncIndicatorToggled = ref(false);
  const isGlobalSpinnerShown = ref(false);
  const isGlobalOverlayShown = ref(false);

  const setIsSyncIndicatorToggled = (value: boolean) => {
    isSyncIndicatorToggled.value = value;
    window.onbeforeunload = value
      ? () => {
          return 'Do you really want to leave?';
        }
      : null;
  };

  const setIsGlobalSpinnerShown = (value: boolean) => {
    isNavbarHidden.value = true;
    isGlobalSpinnerShown.value = value;
    isGlobalOverlayShown.value = value;
  };

  const toggleNavigationBar = () => {
    isGlobalOverlayShown.value = isNavbarHidden.value;

    isNavbarHidden.value = !isNavbarHidden.value;
  };

  return {
    isNavbarHidden: readonly(isNavbarHidden),
    isSyncIndicatorToggled: readonly(isSyncIndicatorToggled),
    isGlobalSpinnerShown: readonly(isGlobalSpinnerShown),
    isGlobalOverlayShown: readonly(isGlobalOverlayShown),
    setIsSyncIndicatorToggled,
    setIsGlobalSpinnerShown,
    toggleNavigationBar,
  };
});
