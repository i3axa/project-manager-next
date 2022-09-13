import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.scss';
import i18n from './locale';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import Draggable from 'vuedraggable';
import { createTheme, ThemeValue } from './plugins/theme';

const app = createApp(App);

const theme = createTheme();

app
  .use(router)
  .use(i18n)
  .use(BootstrapIconsPlugin)
  .use(theme)
  .component('base-draggable', Draggable);

app.mount('#app');
