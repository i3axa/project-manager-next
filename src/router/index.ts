import { createRouter, createWebHistory } from 'vue-router';

const MainPage = () => import('@/views/MainPage.vue');
const AuthorizationView = () => import('@/views/AuthorizationView.vue');
const AdminPanelView = () => import('@/views/AdminPanelView.vue');
const UserPanelView = () => import('@/views/UserPanelView.vue');
const SettingsView = () => import('@/views/SettingsView.vue');
const EmployeeView = () => import('@/views/EmployeeView.vue');
const CreateTaskView = () => import('@/views/CreateTaskView.vue');
const UpdateTaskView = () => import('@/views/UpdateTaskView.vue');

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
