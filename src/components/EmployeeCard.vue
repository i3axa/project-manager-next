<script setup lang="ts">
import useTasks from '@/hooks/useTasks';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import EmployeesTaskEditDropdown from '@/components/EmployeesTaskEditDropdown.vue';
import { computed } from 'vue';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import type { Id } from '@/types/API';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

interface IProps {
  employee: IEmployee;
  director?: Id;
}

interface IEmits {
  (eventName: 'taskRelease', taskId: Id): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const { tasks, isLoading } = useTasks({
  employee: props.employee._id,
  project: props.employee.project,
  director: props.director,
});

const totalDifficulty = computed(() => {
  const difficulties = tasks.value.map((task) => task.difficulty);

  return difficulties.reduce((previous, current) => previous + current, 0);
});

const releaseTask = (taskIndex: number) => {
  const releasedTask = tasks.value.splice(taskIndex, 1)[0];

  emit('taskRelease', releasedTask._id);
};

const styleStore = useStyleStore();

const deleteTask = async (taskIndex: number) => {
  if (!confirm(i18n.t('modal.confirm'))) {
    return;
  }

  const task = tasks.value[taskIndex];

  styleStore.setIsSyncIndicatorToggled(true);

  await TaskService.deleteTask(task._id);
  tasks.value.splice(taskIndex, 1);

  styleStore.setIsSyncIndicatorToggled(false);
};

const onTaskAdd = async ({ newIndex }: { newIndex: number }) => {
  const newTask = tasks.value[newIndex];

  if (newTask.employee === props.employee._id) {
    return;
  }

  styleStore.setIsSyncIndicatorToggled(true);

  await TaskService.patchTask(newTask._id, { employee: props.employee._id });
  newTask.employee = props.employee._id;

  styleStore.setIsSyncIndicatorToggled(false);
};

const hideDropDowns = () => {
  const elements = document.getElementsByClassName('dropdown');

  for (const dropdown of Array.from(elements)) {
    (dropdown as HTMLElement).click();
  }
};
</script>

<template>
  <div class="card">
    <div class="mb-4 w-full flex flex-col gap-2">
      <div class="w-full flex flex-row justify-between gap-5">
        <h4>{{ employee.user.name }} {{ employee.user.surname }}</h4>
        <router-link
          class="btn-outline-secondary text-sm !opacity-100"
          :to="`/employee/${employee._id}`"
        >
          <b-icon-box-arrow-up-right />
        </router-link>
      </div>
      <h6>{{ employee.user.skills }}</h6>
    </div>
    <div
      class="add-task border-gray-300 text-slate-400 unselectable"
      @click="
        $router.push({
          path: 'taskCreation',
          query: {
            project: employee.project,
            employee: employee._id,
          },
        })
      "
    >
      + {{ $t('dashboard.addTask') }}
    </div>
    <b-icon-arrow-clockwise
      class="animate-spin text-gray-400 self-center h-full text-3xl"
      v-if="isLoading"
    />
    <base-draggable
      v-else
      class="task-list"
      :list="tasks"
      animation="150"
      group="tasks"
      itemKey="id"
      filter=".ignore"
      @add="onTaskAdd"
      @start="hideDropDowns"
    >
      <template
        #item="{ element, index: taskIndex }: { element: ITask, index: number }"
      >
        <div
          class="task rounded-2xl shadow !border-none"
          :style="{
            backgroundColor: `var(--difficulty-${element.difficulty})`,
          }"
          @click="hideDropDowns"
        >
          <h5 class="unselectable w-max !text-dark">
            {{ element.title }} ({{ element.difficulty }})
          </h5>
          <EmployeesTaskEditDropdown
            class="ignore dropdown"
            :task-id="element._id"
            @task-remove="releaseTask(taskIndex)"
            @task-delete="deleteTask(taskIndex)"
          />
        </div>
      </template>
    </base-draggable>
    <div
      class="difficulty-badge text-gray-600 dark:text-gray-800 bg-gray-300 dark:bg-gray-400 italic"
    >
      <span class="font-semibold">{{ $t('dashboard.totalDifficulty') }}: </span>
      <span class="font-normal">{{ totalDifficulty }}</span>
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
  min-width: 250px;
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

.add-task {
  margin-bottom: 10px;
  border-width: 2px;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  font-style: oblique;
  transition: opacity 0.3s ease-in-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.dark .add-task {
  filter: brightness(0.6);
}

.add-task:hover {
  opacity: 0.7;
}

.add-task:active {
  opacity: 0.5;
}
</style>
