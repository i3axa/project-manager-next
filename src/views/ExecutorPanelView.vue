<script setup lang="ts">
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useExecutor from '@/hooks/useExecutor';
import { useAuthStore } from '@/store/auth';
import type { Id } from '@/types/API';
import { ref, watch } from 'vue';
import ListBox from '@/components/UI/ListBox.vue';

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw 'Unauthorized error';
}

const currentProject = ref<Id | undefined>(
  localStorage.getItem('currentProject') || undefined
);

watch(currentProject, () => {
  if (currentProject.value) {
    localStorage.setItem('currentProject', currentProject.value);
  }
});

const { tasks, projects, currentEmployee, isLoading } = useExecutor(
  authStore.credentials.user.id,
  currentProject
);
</script>

<template>
  <LoadingSpinner v-if="isLoading" class="w-full" />
  <div v-else-if="projects.length === 0">No projects</div>
  <div v-else class="w-full flex flex-col gap-2 items-center">
    <ListBox
      v-if="!isLoading"
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
    <TaskStateColumns
      :employee="currentEmployee"
      :tasks="tasks"
      :isInteractive="true"
    ></TaskStateColumns>
  </div>
</template>

<style scoped lang="scss"></style>
