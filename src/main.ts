import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/index.scss';
import i18n from '@/locale';
import Draggable from 'vuedraggable';
import { createTheme } from '@/plugins/theme';
import { createPinia } from 'pinia';

const app = createApp(App);
const theme = createTheme();
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(theme)
  .component('base-draggable', Draggable)
  .mount('#app');
