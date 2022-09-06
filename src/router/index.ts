import MainPage from '@/views/MainPage.vue';
import AuthorizationView from '@/views/AuthorizationView.vue';
import AdminPanelView from '@/views/AdminPanelView.vue';
import UserPanelView from '@/views/UserPanelView.vue';
import SettingsView from '@/views/SettingsView.vue';
import EmployeeView from '@/views/EmployeeView.vue';
import CreateTaskView from '@/views/CreateTaskView.vue';
import UpdateTaskView from '@/views/UpdateTaskView.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
    {
      path: '/employee/:id',
      name: 'Employee',
      component: EmployeeView,
    },
    {
      path: '/user',
      name: 'UserPanel',
      component: UserPanelView,
    },
    {
      path: '/taskCreation',
      name: 'TaskCreation',
      component: CreateTaskView,
    },
    {
      path: '/taskUpdate/:id',
      name: 'TaskUpdate',
      component: UpdateTaskView,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
    },
  ],
});

export default router;
