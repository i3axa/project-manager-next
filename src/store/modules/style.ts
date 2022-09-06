import type { State } from '..';
import type { Module } from 'vuex';

export interface StyleState {
  isNavbarHidden: boolean;
  isSyncIndicatorToggled: boolean;
  isGlobalSpinnerShown: boolean;
}

export enum StyleActions {
  toggleNavigationBar = 'style/toggleNavigationBar',
}

export enum StyleMutations {
  setIsSyncIndicatorToggled = 'style/setIsSyncIndicatorToggled',
  setIsGlobalSpinnerShown = 'style/setIsGlobalSpinnerShown',
}

export const styleModule: Module<StyleState, State> = {
  namespaced: true,

  state: (): StyleState => {
    return {
      isNavbarHidden: true,
      isSyncIndicatorToggled: false,
      isGlobalSpinnerShown: false,
    };
  },

  mutations: {
    setIsSyncIndicatorToggled(state, value: boolean) {
      state.isSyncIndicatorToggled = value;
      window.onbeforeunload = value
        ? () => {
            return 'Do you really want to leave?';
          }
        : null;
    },
    setIsGlobalSpinnerShown(state, value: boolean) {
      state.isGlobalSpinnerShown = value;
    },
  },

  actions: {
    toggleNavigationBar({ state }): void {
      const navbar = document.getElementById('navbar');
      const globalOverlay = document.getElementById('global-overlay');

      if (state.isNavbarHidden) {
        navbar!.style.left = '0';
        globalOverlay!.style.display = 'block';
      } else {
        navbar!.style.left = '-100%';
        globalOverlay!.style.display = 'none';
      }

      state.isNavbarHidden = !state.isNavbarHidden;
    },
  },
};
