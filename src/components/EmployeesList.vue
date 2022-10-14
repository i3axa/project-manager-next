<script setup lang="ts">
import type ITask from '@/models/ITask';
import type IEmployee from '@/models/IEmployee';
import EmployeesTaskEditDropdown from '@/components/EmployeesTaskEditDropdown.vue';
import EmployeeCard from '@/components/EmployeeCard.vue';
import type { Id } from '@/types/API';

interface IEmits {
  (eventName: 'taskRelease', taskId: Id): void;
}

interface IProps {
  employees: IEmployee[];
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const releaseTask = (taskId: Id) => {
  emit('taskRelease', taskId);
};
</script>

<template>
  <div class="employees-list">
    <EmployeeCard
      v-for="employee in employees"
      :key="employee._id"
      :employee="employee"
      @task-release="releaseTask"
    />
  </div>
</template>

<style scoped lang="scss">
.difficulty-badge {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: small;
  border-radius: 10px;
  padding: 2px 5px 2px 5px;
  width: fit-content;
  align-self: end;
}

.task-list {
  height: 100%;
}

.close {
  stroke-width: 2px;
  stroke: currentColor;
}

.card {
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  flex: none;
  min-height: 250px;
}

.task {
  padding: 10px;
  border-width: 1px;
  margin-top: 0.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  cursor: move;
}

.employees-list {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  overflow-x: auto;
  overflow-y: clip;
  padding-bottom: 90px;
}

.employees-list::before,
.employees-list::after {
  content: '';
  flex: 1;
}
</style>
