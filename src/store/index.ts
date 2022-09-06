import { createStore } from 'vuex';
import { styleModule, type StyleState } from './modules/style';
import { authModule, type AuthState } from './modules/auth';

export interface State {
  style: StyleState;
  auth: AuthState;
}

export default createStore({
  modules: {
    style: styleModule,
    auth: authModule,
  },
});
