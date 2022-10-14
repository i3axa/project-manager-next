<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useEmployees from '@/hooks/useEmployees';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import { useI18n } from 'vue-i18n';
import InfoModal from '@/components/UI/InfoModal.vue';
import { ref, watch } from 'vue';
import useTasks from '@/hooks/useTasks';
import type { Id } from '@/types/API';

const i18n = useI18n();
const styleStore = useStyleStore();

const project = '632f28765e28ff847f1f7d9d';

const { employees, isLoading: areEmployeesLoading } = useEmployees({ project });

const { tasks: freeTasks, isLoading: areFreeTasksLoading } = useTasks({
  project,
  isFree: '1',
});

const onFreeTaskAdd = async (newIndex: number) => {
  const newTask = freeTasks.value[newIndex];

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

const onFreeTaskDelete = async (taskIndex: number) => {
  if (!confirm(i18n.t('modal.confirm'))) {
    return;
  }

  styleStore.setIsSyncIndicatorToggled(true);

  const deleted = freeTasks.value.splice(taskIndex, 1);

  await TaskService.deleteTask(deleted[0]._id);

  styleStore.setIsSyncIndicatorToggled(false);
};

const isInviteModalOpen = ref(false);
const openInviteModal = () => {
  isInviteModalOpen.value = true;
};
</script>

<template>
  <div class="admin-panel bg-white dark:bg-slate-800 dark:bg-opacity-50">
    <div class="header">
      <h2 style="line-height: 2.15rem">{{ $t('dashboard.employees') }}</h2>
      <button
        class="btn-outline-primary px-2 py-2 text-xs"
        @click="openInviteModal"
      >
        <b-icon-plus-lg />
      </button>
    </div>
    <LoadingSpinner v-if="areEmployeesLoading" />
    <EmployeesList
      :employees="employees"
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
            query: { project },
          })
        "
      >
        <b-icon-plus-lg />
      </button>
    </div>
    <LoadingSpinner v-if="areFreeTasksLoading" />
    <FreeTasksList
      :tasks="freeTasks"
      @task-delete="onFreeTaskDelete"
      @task-add="onFreeTaskAdd"
      v-else
    ></FreeTasksList>

    <InfoModal :isOpen="isInviteModalOpen" @close="isInviteModalOpen = false">
      <template #header> {{ $t('dashboard.inviteModal.header') }} </template>
      <template #content>
        {{ $t('dashboard.inviteModal.content') }}
      </template>
      <template #close-button>
        {{ $t('modal.closeInfo') }}
      </template>
    </InfoModal>
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

.admin-panel {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 65px;
  width: 100%;
}
</style>
