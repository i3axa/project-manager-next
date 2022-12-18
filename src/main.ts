import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/index.scss';
import i18n from '@/locale';
import { createTheme } from '@/plugins/theme';
import { createPinia } from 'pinia';

const app = createApp(App);
const theme = createTheme();
const pinia = createPinia();

app.use(pinia).use(router).use(i18n).use(theme).mount('#app');
