<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useEmployees from '@/hooks/useEmployees';
import useFreeTasks from '@/hooks/useFreeTasks';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import store from '@/store';
import { StyleMutations } from '@/store/modules/style';

const {
  employees,
  isLoading: isEmployeesLoading,
  updateTasks,
} = useEmployees();

const { freeTasks, isLoading: isFreeTasksLoading } = useFreeTasks();

const onTaskRelease = async (task: ITask, employee: IEmployee) => {
  store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

  freeTasks.value.push(task);

  await TaskService.patchTask(task._id, { isFree: true });

  await updateTasks(employee);
};

const onFreeTaskDelete = async (taskIndex: number) => {
  if (!confirm('Are you sure?')) {
    return;
  }

  store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

  const deleted = freeTasks.value.splice(taskIndex, 1);

  await TaskService.deleteTask(deleted[0]._id);

  store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
};
</script>

<template>
  <div class="admin-panel bg-white dark:bg-slate-800 dark:bg-opacity-50">
    <h2>{{ $t('dashboard.employees') }}</h2>
    <LoadingSpinner v-if="isEmployeesLoading" />
    <EmployeesList
      :employees="employees"
      @taskRelease="onTaskRelease"
      v-else
    ></EmployeesList>

    <h2>{{ $t('dashboard.tasks') }}</h2>
    <LoadingSpinner v-if="isFreeTasksLoading" />
    <FreeTasksList
      :tasks="freeTasks"
      @taskDelete="onFreeTaskDelete"
      v-else
    ></FreeTasksList>
  </div>
</template>

<style scoped lang="scss">
h2 {
  align-self: center;
}

.admin-panel {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 30px;
  border-radius: 65px;
  width: 100%;
}
</style>
