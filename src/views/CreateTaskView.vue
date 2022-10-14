<script setup lang="ts">
import TaskEditForm from '@/components/TaskEditForm.vue';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const styleStore = useStyleStore();

interface IProps {
  task?: Partial<ITask>;
}

defineProps<IProps>();

const onSubmit = async (task: Ref<Partial<ITask>>, files?: File[]) => {
  const formData = new FormData();

  for (const key in task.value) {
    const safeKey = key as keyof ITask;

    formData.append(key, task.value[safeKey] as string);
  }

  files?.forEach((file) => {
    formData.append('files', file);
  });

  styleStore.setIsGlobalSpinnerShown(true);

  await TaskService.createTask(formData);

  router.back();

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <div class="outer">
    <TaskEditForm :task="task" @submit="onSubmit" />
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
