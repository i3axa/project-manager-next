<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import { ref } from 'vue';
import type { Id } from '@/types/API';
import ListBox from '@/components/UI/ListBox.vue';
import { useAuthStore } from '@/store/auth';
import useManager from '@/hooks/useManager';
import useFreeTasks from '@/hooks/useFreeTasks';
import MiniLoadingSpinner from '@/components/UI/MiniLoadingSpinner.vue';
import ConfirmModal from '@/components/UI/ConfirmModal.vue';

const styleStore = useStyleStore();
const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw 'Unauthorized error';
}

const currentProject = ref<Id>();

const {
  executors,
  projects,
  manager,
  isLoading: areExecutorsLoading,
} = useManager(authStore.credentials.user.id, currentProject);

const { freeTasks, isLoading: areFreeTasksLoading } =
  useFreeTasks(currentProject);

const onFreeTaskAdd = async (newIndex: number) => {
  const newTask = freeTasks.value.filter(
    (t) => t.project === currentProject.value
  )[newIndex];

  if (newTask.employee === null) {
    return;
  }

  styleStore.setIsSyncIndicatorToggled(true);

  await TaskService.patchTask(newTask._id, { employee: null });
  newTask.employee = null;

  styleStore.setIsSyncIndicatorToggled(false);
};

const onTaskRelease = async (taskId: Id) => {
  styleStore.setIsSyncIndicatorToggled(true);

  const response = await TaskService.patchTask(taskId, { employee: null });
  freeTasks.value.push(response.data.task);

  styleStore.setIsSyncIndicatorToggled(false);
};

const isConfirmModalOpen = ref(false);

let onContinue = ref(() => {});

const deleteTask = async (taskIndex: number) => {
  styleStore.setIsSyncIndicatorToggled(true);

  const deleted = freeTasks.value.splice(taskIndex, 1);

  await TaskService.deleteTask(deleted[0]._id);

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
  <div v-if="!areExecutorsLoading && !manager">No projects</div>
  <div v-else class="panel">
    <div class="header">
      <h2 class="hidden sm:block" style="line-height: 2.15rem">
        {{ $t('dashboard.employees') }}:
      </h2>
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
    </div>
    <MiniLoadingSpinner v-if="areExecutorsLoading" />
    <EmployeesList
      :director="manager?._id"
      :employees="executors.filter((e) => e.project === currentProject)"
      @task-release="onTaskRelease"
      v-else
    ></EmployeesList>

    <div class="header">
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
    </div>
    <MiniLoadingSpinner v-if="areFreeTasksLoading" />
    <FreeTasksList
      :tasks="freeTasks"
      @task-delete="onFreeTaskDelete"
      @task-add="onFreeTaskAdd"
    ></FreeTasksList>

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

.panel {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
}
</style>
