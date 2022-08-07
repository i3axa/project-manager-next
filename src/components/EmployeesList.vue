<script setup lang="ts">
import useEmployees from '@/hooks/useEmployees';
import type ITask from '@/models/ITask';
import { watch } from 'vue';

const { employees } = useEmployees();
employees.value.forEach((employee) => {
  watch(employee.takenTasks, (newTasks) => console.log(newTasks));
});

const getTotalDifficulty = (tasks: ITask[]) => {
  const difficulties = tasks.map((task) => task.difficulty);

  return difficulties.reduce((previous, current) => previous + current);
};
</script>

<template>
  <div class="employees-list">
    <div class="card" v-for="employee in employees">
      <div class="card-header mb-4 w-max flex flex-col gap-2">
        <div class="min-w-max flex flex-row gap-5">
          <h4>{{ employee.name }} {{ employee.surname }}</h4>
          <button class="btn-outline-secondary text-sm">
            <b-icon-box-arrow-up-right />
          </button>
        </div>
        <h6>{{ employee.skills }}</h6>
      </div>
      <base-draggable
        class="task-list"
        :list="employee.takenTasks"
        animation="150"
        group="tasks"
        itemKey="id"
        filter=".ignore"
      >
        <template #item="{ element }">
          <div
            class="task rounded-2xl shadow !border-none"
            :style="{
              backgroundColor: `var(--difficulty-${element.difficulty})`,
            }"
          >
            <h5 class="unselectable w-max !text-dark">
              {{ element.title }} ({{ element.difficulty }})
            </h5>
            <button class="ignore text-gray-800 hover:opacity-70">
              <b-icon-x-lg class="close" />
            </button>
          </div>
        </template>
      </base-draggable>
      <div
        class="difficulty-badge text-gray-600 dark:text-gray-800 bg-gray-300 dark:bg-gray-400 italic"
      >
        <span class="font-semibold"
          >{{ $t('dashboard.totalDifficulty') }}:
        </span>
        <span class="font-normal">{{
          getTotalDifficulty(employee.takenTasks)
        }}</span>
      </div>
    </div>
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

.dark .task {
  filter: brightness(0.8);
}

.employees-list {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  overflow-x: auto;
}

.employees-list::before,
.employees-list::after {
  content: '';
  flex: 1;
}
</style>
