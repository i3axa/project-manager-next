<script setup lang="ts">
import type ITask from '@/models/ITask';
import TaskEditForm from '@/components/TaskEditForm.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import useTask from '@/hooks/useTask';

const route = useRoute();
const styleStore = useStyleStore();

if (route.params.id === undefined) {
  throw new Error('Unknown id');
}

const { task, isLoading } = useTask(route.params.id as string);
const files = ref<File[]>([]);

const onSubmit = async () => {
  if (!task.value) {
    return;
  }

  const formData = new FormData();

  for (const key in task.value) {
    const safeKey = key as keyof ITask;

    formData.append(key, task.value[safeKey] as string);
  }

  files.value.forEach((file) => {
    formData.append('files', file);
  });

  styleStore.setIsGlobalSpinnerShown(true);

  const response = await TaskService.putTask(task.value._id, formData);

  task.value = response.data.task;

  files.value = [];

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <div class="outer">
    <LoadingSpinner v-if="isLoading || task === undefined" />
    <TaskEditForm
      v-else
      v-model:files="files"
      v-model:task="task"
      @submit="onSubmit"
    />
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
