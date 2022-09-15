import { defineStore } from 'pinia';

export interface StyleState {
  isNavbarHidden: boolean;
  isSyncIndicatorToggled: boolean;
  isGlobalSpinnerShown: boolean;
}

export const useStyleStore = defineStore('style', {
  state: (): StyleState => {
    return {
      isNavbarHidden: true,
      isSyncIndicatorToggled: false,
      isGlobalSpinnerShown: false,
    };
  },
  actions: {
    setIsSyncIndicatorToggled(value: boolean) {
      this.isSyncIndicatorToggled = value;
      window.onbeforeunload = value
        ? () => {
            return 'Do you really want to leave?';
          }
        : null;
    },
    setIsGlobalSpinnerShown(value: boolean) {
      this.isGlobalSpinnerShown = value;
    },
    toggleNavigationBar(): void {
      const navbar = document.getElementById('navbar');
      const globalOverlay = document.getElementById('global-overlay');

      if (this.isNavbarHidden) {
        navbar!.style.left = '0';
        globalOverlay!.style.display = 'block';
      } else {
        navbar!.style.left = '-100%';
        globalOverlay!.style.display = 'none';
      }

      this.isNavbarHidden = !this.isNavbarHidden;
    },
  },
});
