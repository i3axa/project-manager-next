<script setup lang="ts">
import type ITask from '@/models/ITask';
import type IEmployee from '@/models/IEmployee';
import EmployeesTaskEditDropdown from '@/components/EmployeesTaskEditDropdown.vue';

interface IEmits {
  (eventName: 'taskRelease', task: ITask, employee: IEmployee): void;
  (eventName: 'taskDelete', taskIndex: number, employeeIndex: number): void;
}

interface IProps {
  employees: IEmployee[];
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const getTotalDifficulty = (tasks: ITask[]) => {
  const difficulties = tasks.map((task) => task.difficulty);

  return difficulties.reduce((previous, current) => previous + current, 0);
};

const releaseTask = (taskIndex: number, employee: IEmployee) => {
  const deletedTask = employee.takenTasks.splice(taskIndex, 1)[0];

  emit('taskRelease', deletedTask, employee);
};
</script>

<template>
  <div class="employees-list">
    <div
      class="card"
      v-for="(employee, employeeIndex) in employees"
      :key="employee.id"
    >
      <div class="mb-4 w-max flex flex-col gap-2">
        <div class="min-w-max flex flex-row gap-5">
          <h4>{{ employee.name }} {{ employee.surname }}</h4>
          <router-link
            class="btn-outline-secondary text-sm !opacity-100"
            :to="`/employee/${employee.id}`"
          >
            <b-icon-box-arrow-up-right />
          </router-link>
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
        <template
          #item="{
            element,
            index: taskIndex,
          }: {
            element: ITask,
            index: number,
          }"
        >
          <div
            class="task rounded-2xl shadow !border-none"
            :style="{
              backgroundColor: `var(--difficulty-${element.difficulty})`,
            }"
          >
            <h5 class="unselectable w-max !text-dark">
              {{ element.title }} ({{ element.difficulty }})
            </h5>
            <EmployeesTaskEditDropdown
              class="ignore"
              :task-id="element._id"
              @taskDelete="$emit('taskDelete', taskIndex, employeeIndex)"
              @taskRemove="releaseTask(taskIndex, employee)"
            />
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
