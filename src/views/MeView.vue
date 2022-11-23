<script setup lang="ts">
import useProjects from '@/hooks/useProjects';
import useUser from '@/hooks/useUser';
import { useAuthStore } from '@/store/auth';
import { BIconPerson } from 'bootstrap-icons-vue';

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw new Error('User is not authorized');
}

const { user } = useUser(authStore.credentials.user.id);
const { projects, isLoading } = useProjects();
</script>

<template>
  <div>
    <b-icon-person class="text-8xl" />
    <div>{{ user?.email }}</div>
    <div>{{ user?.name }}</div>
    <div>{{ user?.surname }}</div>
    <div>{{ user?.skills }}</div>
    <div v-for="project in projects">{{ project }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
