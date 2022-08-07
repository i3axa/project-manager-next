import type { State } from '..';
import type { Module } from 'vuex';

export interface StyleState {
  isNavbarHidden: boolean;
}

export enum StyleActions {
  toggleNavigationBar = 'style/toggleNavigationBar',
  enableGlobalSpinner = 'style/enableGlobalSpinner',
  disableGlobalSpinner = 'style/disableGlobalSpinner',
}

export const styleModule: Module<StyleState, State> = {
  namespaced: true,

  state: (): StyleState => {
    let isNavbarHidden = true;

    return {
      isNavbarHidden,
    };
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
    enableGlobalSpinner(): void {
      const spinner = document.getElementById('global-spinner');
      const globalOverlay = document.getElementById('global-overlay');

      spinner!.style.display = 'flex';
      globalOverlay!.style.display = 'block';
    },
    disableGlobalSpinner(): void {
      const spinner = document.getElementById('global-spinner');
      const globalOverlay = document.getElementById('global-overlay');

      spinner!.style.display = 'none';
      globalOverlay!.style.display = 'none';
    },
  },
};
