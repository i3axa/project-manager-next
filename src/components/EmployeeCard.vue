<script setup lang="ts">
import useTasks from '@/hooks/useTasks';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import EmployeesTaskEditDropdown from '@/components/EmployeesTaskEditDropdown.vue';
import { computed, ref } from 'vue';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import type { Id } from '@/types/API';
import MiniLoadingSpinner from '@/components/UI/MiniLoadingSpinner.vue';
import ConfirmModal from '@/components/UI/ConfirmModal.vue';
import { TaskState } from '@/types/API';
import TooltipPopper from '@/components/UI/TooltipPopper.vue';
import {
  BIconBoxArrowUpRight,
  BIconCheck2Circle,
  BIconSlashCircle,
  BIconExclamationCircle,
} from 'bootstrap-icons-vue';

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
  const task = tasks.value[taskIndex];

  styleStore.setIsSyncIndicatorToggled(true);

  await TaskService.deleteTask(task._id);
  tasks.value.splice(taskIndex, 1);

  styleStore.setIsSyncIndicatorToggled(false);
};

const isConfirmModalOpen = ref(false);

let onContinue = ref(() => {});

const onTaskDelete = (taskIndex: number) => {
  isConfirmModalOpen.value = true;

  onContinue.value = () => {
    deleteTask(taskIndex);
    isConfirmModalOpen.value = false;
  };
};

const forceHideTooltips = ref<boolean>(false);

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

const hidePopups = () => {
  forceHideTooltips.value = true;
  const elements = Array.from(document.getElementsByClassName('dropdown'));

  elements.forEach((dropdown) => {
    const isOpened = dropdown.getAttribute('data-headlessui-state') === 'open';

    if (isOpened) {
      setTimeout(() => {
        (dropdown as HTMLButtonElement).dispatchEvent(new Event('click'));
      }, 0);
    }
  });
};

const isTaskExpired = ({ deadline }: ITask) => {
  return new Date() > new Date(deadline);
};
</script>

<template>
  <div class="card">
    <div class="mb-4 w-full flex flex-col gap-2">
      <div class="w-full flex flex-row justify-between gap-5">
        <div class="text-lg font-semibold dark:text-light">
          {{ employee.user.name }} {{ employee.user.surname }}
        </div>
        <router-link
          class="btn-outline-secondary text-sm !opacity-100"
          :to="`/employee/${employee._id}`"
        >
          <b-icon-box-arrow-up-right />
        </router-link>
      </div>
      <div class="dark:text-light">{{ employee.user.skills }}</div>
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
      {{ $t('dashboard.addTask') }}
    </div>
    <MiniLoadingSpinner v-if="isLoading" />
    <base-draggable
      v-else
      class="task-list"
      :list="tasks"
      animation="150"
      group="tasks"
      itemKey="id"
      filter=".ignore"
      @add="onTaskAdd"
      @end="forceHideTooltips = false"
    >
      <template
        #item="{ element, index: taskIndex }: { element: ITask, index: number }"
      >
        <TooltipPopper
          :text="$t('dashboard.' + element.state)"
          :force-hide="forceHideTooltips"
          :delay="600"
        >
          <div
            class="task rounded-2xl shadow !border-none"
            :style="{
              backgroundColor: `var(--difficulty-${element.difficulty})`,
            }"
            @mousedown="hidePopups"
            @mouseup="forceHideTooltips = false"
          >
            <div class="flex flex-row gap-1 items-center overflow-hidden">
              <b-icon-check2-circle
                class="min-w-max"
                v-if="element.state === TaskState.STOPED"
              />
              <b-icon-slash-circle
                class="min-w-max"
                v-else-if="element.state === TaskState.CLOSED"
              />
              <b-icon-exclamation-circle
                class="min-w-max"
                v-else-if="isTaskExpired(element)"
              />
              <div
                class="task-title text-base font-semibold unselectable !text-dark"
              >
                {{ element.title }} ({{ element.difficulty }})
              </div>
            </div>
            <EmployeesTaskEditDropdown
              class="ignore dropdown"
              :task="element"
              @task-remove="releaseTask(taskIndex)"
              @task-delete="onTaskDelete(taskIndex)"
            />
          </div>
        </TooltipPopper>
      </template>
    </base-draggable>
    <div
      class="difficulty-badge text-gray-600 dark:text-gray-800 bg-gray-300 dark:bg-gray-400 italic"
    >
      <span class="font-semibold">{{ $t('dashboard.totalDifficulty') }}: </span>
      <span class="font-normal">{{ totalDifficulty }}</span>
    </div>

    <ConfirmModal
      :is-open="isConfirmModalOpen"
      @continue="onContinue"
      @cancel="isConfirmModalOpen = false"
    ></ConfirmModal>
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
  max-width: 250px;
}

.task-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
