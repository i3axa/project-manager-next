<script setup lang="ts">
import type IEmployee from '@/models/IEmployee';
import EmployeeCard from '@/components/EmployeeCard.vue';
import type { Id } from '@/types/API';

interface IEmits {
  (eventName: 'taskRelease', taskId: Id): void;
}

interface IProps {
  employees: IEmployee[];
  director?: Id;
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
      :director="director"
      :employee="employee"
      @task-release="releaseTask"
    />
  </div>
</template>

<style scoped lang="scss">
.employees-list {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  overflow-x: auto;
  overflow-y: clip;
  padding-bottom: 2rem;
  position: relative;
}

.employees-list::before,
.employees-list::after {
  content: '';
  flex: 1;
}
</style>
