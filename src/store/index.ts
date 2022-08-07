import { createStore } from 'vuex';
import { styleModule, type StyleState } from './modules/style';

export interface State {
  style: StyleState;
}

export default createStore({
  modules: {
    style: styleModule,
  },
});
