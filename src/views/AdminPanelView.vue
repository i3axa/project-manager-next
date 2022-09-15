<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useEmployees from '@/hooks/useEmployees';
import useFreeTasks from '@/hooks/useFreeTasks';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import { useI18n } from 'vue-i18n';
import InfoModal from '@/components/UI/InfoModal.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const i18n = useI18n();
const authStore = useAuthStore();
const styleStore = useStyleStore();

const {
  employees,
  isLoading: isEmployeesLoading,
  updateTasks,
} = useEmployees();

const { freeTasks, isLoading: isFreeTasksLoading } = useFreeTasks();

const onTaskRelease = async (task: ITask, employee: IEmployee) => {
  styleStore.setIsSyncIndicatorToggled(true);

  freeTasks.value.push(task);

  await updateTasks(employee);

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

const onEmployeesTaskDelete = async (
  taskIndex: number,
  employeeIndex: number
) => {
  if (!confirm(i18n.t('modal.confirm'))) {
    return;
  }

  styleStore.setIsSyncIndicatorToggled(true);

  const employee = employees.value[employeeIndex];

  const deleted = employee.takenTasks.splice(taskIndex, 1);

  await updateTasks(employee);
  await TaskService.deleteTask(deleted[0]._id);

  styleStore.setIsSyncIndicatorToggled(false);
};

const isInviteModalOpen = ref(false);
const openInviteModal = () => {
  navigator.clipboard.writeText(authStore.credentials.user?.project || '');
  isInviteModalOpen.value = true;
};
</script>

<template>
  <div class="admin-panel bg-white dark:bg-slate-800 dark:bg-opacity-50">
    <div class="header mb-8">
      <h2 style="line-height: 2.15rem">{{ $t('dashboard.employees') }}</h2>
      <button
        class="btn-outline-primary px-2 py-2 text-xs"
        @click="openInviteModal"
      >
        <b-icon-plus-lg />
      </button>
    </div>
    <LoadingSpinner v-if="isEmployeesLoading" />
    <EmployeesList
      :employees="employees"
      @taskRelease="onTaskRelease"
      @taskDelete="onEmployeesTaskDelete"
      v-else
    ></EmployeesList>

    <div class="header">
      <h2 style="line-height: 2.15rem">{{ $t('dashboard.tasks') }}</h2>
      <button
        class="btn-outline-secondary px-2 py-2 text-xs"
        @click="$router.push('/taskCreation')"
      >
        <b-icon-plus-lg />
      </button>
    </div>
    <LoadingSpinner v-if="isFreeTasksLoading" />
    <FreeTasksList
      :tasks="freeTasks"
      @taskDelete="onFreeTaskDelete"
      v-else
    ></FreeTasksList>

    <InfoModal :isOpen="isInviteModalOpen" @close="isInviteModalOpen = false">
      <template #header> {{ $t('dashboard.inviteModal.header') }} </template>
      <template #content>
        {{
          $t('dashboard.inviteModal.content', {
            inviteCode: authStore.credentials.user?.project,
          })
        }}
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
