<script setup lang="ts">
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useExecutor from '@/hooks/useExecutor';
import { useAuthStore } from '@/store/auth';
import type { Id } from '@/types/API';
import { ref } from 'vue';
import ListBox from '@/components/UI/ListBox.vue';

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw 'Unauthorized error';
}

const currentProject = ref<Id>();

const { tasks, projects, currentEmployee, isLoading } = useExecutor(
  authStore.credentials.user.id,
  currentProject
);
</script>

<template>
  <div class="w-full flex flex-col gap-2 items-center">
    <ListBox
      :items="projects.map((p) => p._id)"
      v-model="currentProject"
      class="w-40"
    >
      <template #title="{ modelValue }">
        {{ projects.find((p) => p._id === modelValue)?.title }}
      </template>
      <template #item="{ item }">
        {{ projects.find((p) => p._id === item)?.title }}
      </template>
    </ListBox>
    <LoadingSpinner class="w-full" v-if="isLoading" />
    <TaskStateColumns
      v-else
      :employee="currentEmployee"
      :tasks="tasks"
      :isInteractive="true"
    ></TaskStateColumns>
  </div>
</template>

<style scoped lang="scss"></style>
