<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
import { useStyleStore } from '@/store/style';
import { computed, ref, watch } from 'vue';
import type { Id, TasksQuery } from '@/types/API';
import ListBox from '@/components/UI/ListBox.vue';
import { useAuthStore } from '@/store/auth';
import useManager from '@/hooks/useManager';
import MiniLoadingSpinner from '@/components/UI/MiniLoadingSpinner.vue';
import ConfirmModal from '@/components/UI/ConfirmModal.vue';
import { BIconPlusLg } from 'bootstrap-icons-vue';
import { useDeleteTask, usePatchTask, useTasks } from '@/api';
import NoProjects from '@/components/NoProjects.vue';

const styleStore = useStyleStore();
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

const {
  executors,
  projects,
  manager,
  isLoading: areExecutorsLoading,
} = useManager(authStore.credentials.user.id, currentProject);

const tasksQueryKey = computed<[string, TasksQuery]>(() => [
  'tasks',
  { project: currentProject.value, director: manager.value?._id },
]);
const { data: tasks, isLoading: areFreeTasksLoading } = useTasks(
  tasksQueryKey,
  { enabled: !!manager }
);

const freeTasks = computed(() =>
  tasks.value.filter((t) => t.employee === null)
);

const { mutateAsync: patchTaskRequest } = usePatchTask(tasksQueryKey);
const { mutateAsync: deleteTaskRequest } = useDeleteTask(tasksQueryKey);

const onFreeTaskAdd = async (newIndex: number) => {
  const newTask = freeTasks.value[newIndex];

  if (newTask.employee === null) {
    return;
  }

  styleStore.setIsSyncIndicatorToggled(true);

  await patchTaskRequest({ id: newTask._id, data: { employee: null } });

  styleStore.setIsSyncIndicatorToggled(false);
};

const isConfirmModalOpen = ref(false);

const onContinue = ref(() => {
  return;
});

const deleteTask = async (taskIndex: number) => {
  styleStore.setIsSyncIndicatorToggled(true);

  await deleteTaskRequest(freeTasks.value[taskIndex]._id);

  styleStore.setIsSyncIndicatorToggled(false);
};

const onFreeTaskDelete = async (taskIndex: number) => {
  isConfirmModalOpen.value = true;

  onContinue.value = () => {
    deleteTask(taskIndex);
    isConfirmModalOpen.value = false;
  };
};
</script>

<template>
  <NoProjects v-if="!areExecutorsLoading && !manager" />
  <div v-bind="$attrs" v-else class="outer">
    <section class="flex flex-col relative">
      <header class="header">
        <h2 class="hidden sm:block" style="line-height: 2.15rem">
          {{ $t('dashboard.project') }}
        </h2>
        <ListBox
          :items="projects?.map((p) => p._id) ?? []"
          v-model="currentProject"
          class="w-40"
        >
          <template #title="{ modelValue }">
            {{ projects?.find((p) => p._id === modelValue)?.title }}
          </template>
          <template #item="{ item }">
            {{ projects?.find((p) => p._id === item)?.title }}
          </template>
        </ListBox>
      </header>
      <MiniLoadingSpinner v-if="areExecutorsLoading" />
      <EmployeesList
        v-else
        :tasks="tasks"
        :director="manager?._id"
        :employees="executors"
      />
    </section>

    <section class="flex flex-col relative">
      <header class="header">
        <h2 style="line-height: 2.15rem">{{ $t('dashboard.tasks') }}</h2>
        <button
          class="btn-outline-secondary px-2 py-2 text-xs"
          @click="
            $router.push({
              path: 'taskCreation',
              query: { project: currentProject },
            })
          "
        >
          <b-icon-plus-lg />
        </button>
      </header>
      <MiniLoadingSpinner v-if="areFreeTasksLoading" />
      <FreeTasksList
        :tasks="freeTasks"
        @task-delete="onFreeTaskDelete"
        @task-add="onFreeTaskAdd"
      />
    </section>

    <ConfirmModal
      :is-open="isConfirmModalOpen"
      @continue="onContinue"
      @cancel="isConfirmModalOpen = false"
    ></ConfirmModal>
  </div>
</template>

<style scoped lang="scss">
h2 {
  align-self: center;
}

.header {
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.outer {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
}
</style>
