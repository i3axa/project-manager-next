import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.scss';
import i18n from './locale';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import Draggable from 'vuedraggable';

const app = createApp(App);

app
  .use(router)
  .use(i18n)
  .use(BootstrapIconsPlugin)
  .component('base-draggable', Draggable);

app.mount('#app');
