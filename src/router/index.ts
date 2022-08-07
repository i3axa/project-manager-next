import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import AuthorizationView from '@/views/AuthorizationView.vue';
import AdminPanelView from '@/views/AdminPanelView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage,
    },
    {
      path: '/auth',
      name: 'Authorization',
      component: AuthorizationView,
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanelView,
    },
  ],
});

export default router;
