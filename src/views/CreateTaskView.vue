<script setup lang="ts">
import TaskEditForm from '@/components/TaskEditForm.vue';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import { reactive, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const styleStore = useStyleStore();

const task = ref<Partial<ITask>>(route.query);

const files = ref<File[]>([]);

const onSubmit = async () => {
  const formData = new FormData();

  for (const key in task.value) {
    const safeKey = key as keyof ITask;

    formData.append(key, task.value[safeKey] as string);
  }

  files.value.forEach((file) => {
    formData.append('files', file);
  });

  styleStore.setIsGlobalSpinnerShown(true);

  await TaskService.createTask(formData);

  router.back();

  files.value = [];

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <div class="outer">
    <TaskEditForm
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
