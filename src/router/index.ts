import { createRouter, createWebHistory } from 'vue-router';

const MainPage = () => import('@/views/MainPage.vue');
const AuthorizationView = () => import('@/views/AuthorizationView.vue');
const ManagerPanelView = () => import('@/views/ManagerPanelView.vue');
const ExecutorPanelView = () => import('@/views/ExecutorPanelView.vue');
const SettingsView = () => import('@/views/SettingsView.vue');
const EmployeeView = () => import('@/views/EmployeeView.vue');
const CreateTaskView = () => import('@/views/CreateTaskView.vue');
const UpdateTaskView = () => import('@/views/UpdateTaskView.vue');
const MeView = () => import('@/views/MeView.vue');

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
      path: '/manager',
      name: 'ManagerPanel',
      component: ManagerPanelView,
    },
    {
      path: '/executor',
      name: 'ExecutorPanel',
      component: ExecutorPanelView,
    },
    {
      path: '/employee/:id',
      name: 'Employee',
      component: EmployeeView,
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
    {
      path: '/me',
      name: 'Me',
      component: MeView,
    },
  ],
});

export default router;
