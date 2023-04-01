<script setup lang="ts">
import { useCreateTask } from '@/api';
import TaskEditForm from '@/components/TaskEditForm.vue';
import type ITask from '@/models/ITask';
import { useStyleStore } from '@/store/style';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const styleStore = useStyleStore();

const task = ref<Partial<ITask>>(route.query);

const files = ref<File[]>([]);

const { mutateAsync: createTask } = useCreateTask();

const onSubmit = async () => {
  styleStore.setIsGlobalSpinnerShown(true);

  await createTask({ data: task.value, files: files.value });

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
