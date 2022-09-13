<script setup lang="ts">
import type ITask from '@/models/ITask';
import TaskEditForm from '@/components/TaskEditForm.vue';
import { useRoute } from 'vue-router';
import useTasks from '@/hooks/useTasks';
import { ref, watch } from 'vue';
import LoadingSpinner from '../components/UI/LoadingSpinner.vue';
import TaskService from '@/services/TaskService';
import store from '@/store';
import { StyleMutations } from '@/store/modules/style';

const route = useRoute();

if (route.params.id === undefined) {
  throw new Error('Unknown id');
}

const { tasks, isLoading } = useTasks();

const selectedTask = ref<ITask>();

watch(isLoading, () => {
  if (isLoading.value) {
    return;
  }

  selectedTask.value = tasks.value.find((task) => task._id === route.params.id);

  if (selectedTask.value === undefined) {
    throw new Error('Invalid task id');
  }
});

const onSubmit = async (task: Partial<ITask>, files?: File[]) => {
  const formData = new FormData();

  for (const key in task) {
    const safeKey = key as keyof ITask;

    formData.append(key, task[safeKey] as string);
  }

  files?.forEach((file) => {
    formData.append('files', file);
  });

  store.commit(StyleMutations.setIsGlobalSpinnerShown, true);

  const response = await TaskService.putTask(task._id!, formData);

  selectedTask.value = response.data.task;

  store.commit(StyleMutations.setIsGlobalSpinnerShown, false);
};
</script>

<template>
  <div class="outer">
    <LoadingSpinner v-if="isLoading" />
    <TaskEditForm :task="selectedTask" @submit="onSubmit" v-else />
  </div>
</template>

<style scoped lang="scss">
.outer {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
