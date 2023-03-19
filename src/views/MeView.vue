<script setup lang="ts">
import useUser from '@/hooks/useUser';
import { useAuthStore } from '@/store/auth';
import { BIconPerson } from 'bootstrap-icons-vue';

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw new Error('User is not authorized');
}

const { user } = useUser(authStore.credentials.user.id);
</script>

<template>
  <div>
    <b-icon-person class="text-8xl" />
    <div>{{ user?._id }}</div>
    <div>{{ user?.email }}</div>
    <div>{{ user?.name }}</div>
    <div>{{ user?.surname }}</div>
    <div>{{ user?.skills }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
