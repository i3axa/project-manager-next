<script setup lang="ts">
import useTaskStateColumns from '@/hooks/useTaskStateColumns';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { useStyleStore } from '@/store/style';
import type { TaskState } from '@/types/API';
import type { ITaskInStateColumn, IStateColumn } from '@/types/TaskStateColumn';
import { BIconThreeDots, BIconPlus, BIconDash } from 'bootstrap-icons-vue';

interface IProps {
  employee?: IEmployee;
  tasks: ITask[];
  isInteractive: boolean;
}

const props = defineProps<IProps>();

const { taskStateColumns } = useTaskStateColumns(props.tasks);

const styleStore = useStyleStore();

const getRouteQuery = (state: TaskState) => {
  return {
    project: props.employee?.project,
    state,
    employee: props.employee?._id,
  };
};

const onTaskAdd = async (
  { newIndex }: { newIndex: number },
  column: IStateColumn
) => {
  const newTask = column.tasks[newIndex];

  styleStore.setIsSyncIndicatorToggled(true);

  await TaskService.patchTask(newTask.task._id, { state: column.state });

  styleStore.setIsSyncIndicatorToggled(false);
};
</script>

<template>
  <div class="state-columns-list">
    <div
      class="card state-column bg-white dark:bg-slate-800"
      v-for="taskStateColumn in taskStateColumns"
    >
      <div class="column-header">
        <span class="text-gray-400 font-semibold text-lg">{{
          $t(taskStateColumn.titleLocaleKey)
        }}</span>
        <div class="difficulty-badge text-white bg-gray-400 dark:bg-gray-600">
          {{ taskStateColumn.totalDifficulty }} *
        </div>
      </div>

      <div
        class="add-task bg-gray-300 text-slate-400 unselectable"
        v-if="isInteractive && employee"
        @click="
          $router.push({
            path: 'taskCreation',
            query: getRouteQuery(taskStateColumn.state),
          })
        "
      >
        + {{ $t('dashboard.addTask') }}
      </div>

      <base-draggable
        class="task-list"
        :list="taskStateColumn.tasks"
        :disabled="!isInteractive"
        animation="150"
        group="tasks"
        itemKey="id"
        filter=".ignore"
        @add="onTaskAdd($event, taskStateColumn)"
      >
        <template #item="{ element }: { element: ITaskInStateColumn }">
          <div
            class="rounded-2xl shadow dark:shadow-slate-900"
            :class="isInteractive ? 'cursor-move' : 'cursor-default'"
          >
            <b-icon-three-dots
              class="text-2xl mx-auto cursor-pointer dark:text-white unselectable"
              @click="element.toggleInfo()"
            />

            <div class="task dark:text-light" v-show="!element.infoToggled">
              <div class="text-lg font-semibold">
                {{ element.task.title }}
              </div>
              <p v-html="element.task.description"></p>
              <div class="progress-bar bg-blue-100">
                <div
                  class="progress-bar-value bg-secondary"
                  :style="{
                    width: `${element.task.progress * 100}%`,
                    backgroundColor: `var(--difficulty-${element.task.difficulty})`,
                  }"
                ></div>
              </div>
              <div class="self-end text-gray-400 text-sm">
                <span v-if="element.days >= 0">
                  🕗 {{ element.days }} {{ $t('dashboard.daysLeft') }}
                </span>
                <span class="text-error" v-else>{{
                  $t('dashboard.expired')
                }}</span>
              </div>
            </div>

            <div class="task dark:text-light" v-show="element.infoToggled">
              <div class="text-ellipsis overflow-hidden">
                <strong>{{ $t('dashboard.director') }}: </strong>
                {{
                  `${element.taskDirector?.name} ${
                    element.taskDirector?.surname || ''
                  }`
                }}
              </div>

              <div>
                <strong>{{ $t('dashboard.standard') }}: </strong
                >{{ Math.round(element.hours) }}{{ $t('dashboard.h') }}
              </div>

              <div class="w-full flex gap-1 items-center">
                <strong>{{ $t('dashboard.used') }}: </strong>
                {{ element.task.usedHours }}{{ $t('dashboard.h') }}
                <span class="ml-auto ignore" v-if="isInteractive">
                  <button
                    class="btn-secondary p-1 rounded-lg text-xs mr-1"
                    @pointerdown="element.startIncrementUsedHours()"
                    @pointerup="element.stopIncrementUsedHours()"
                    @pointerleave="element.stopIncrementUsedHours()"
                  >
                    <b-icon-plus />
                  </button>
                  <button
                    class="btn-secondary p-1 rounded-lg text-xs"
                    :disabled="element.task.usedHours === 0"
                    @pointerdown="element.startDecrementUsedHours()"
                    @pointerup="element.stopDecrementUsedHours()"
                    @pointerleave="element.stopDecrementUsedHours()"
                  >
                    <b-icon-dash />
                  </button>
                </span>
              </div>

              <div>
                <strong>{{ $t('dashboard.difficulty') }}:</strong>
                {{ element.task.difficulty }}
              </div>

              <div class="w-full flex gap-1 items-center">
                <strong>{{ $t('dashboard.progress') }}: </strong
                >{{ Math.trunc(element.task.progress * 100) }}%
                <span class="ml-auto ignore" v-if="isInteractive">
                  <button
                    class="btn-secondary p-1 rounded-lg text-xs mr-1"
                    :disabled="element.task.progress === 1"
                    @pointerdown="element.startIncrementProgress()"
                    @pointerup="element.stopIncrementProgress()"
                    @pointerleave="element.stopIncrementProgress()"
                  >
                    <b-icon-plus />
                  </button>
                  <button
                    class="btn-secondary p-1 rounded-lg text-xs"
                    :disabled="element.task.progress === 0"
                    @pointerdown="element.startDecrementProgress()"
                    @pointerup="element.stopDecrementProgress()"
                    @pointerleave="element.stopDecrementProgress()"
                  >
                    <b-icon-dash />
                  </button>
                </span>
              </div>

              <div class="progress-bar bg-blue-100">
                <div
                  class="progress-bar-value"
                  :style="{
                    width: `${element.task.progress * 100}%`,
                    backgroundColor: `var(--difficulty-${element.task.difficulty})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </template>
      </base-draggable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-header {
  width: 100%;
  gap: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.progress-bar {
  flex-grow: 1;
  height: 6px;
  border-radius: 10px;
}

.progress-bar-value {
  height: 100%;
  transition: width 0.6s linear;
  border-radius: 10px;
}

.dark .progress-bar-value {
  filter: brightness(0.9);
}

.difficulty-badge {
  border-radius: 10px;
  padding: 2px 8px 2px 8px;
}

.task-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.add-task {
  margin-bottom: 25px;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
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

.task {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.state-column {
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: none;
  margin-bottom: 20px;
  min-width: 280px;
  max-width: 400px;
  min-height: 280px;
}

.state-columns-list {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  overflow-x: auto;
  height: max-content;
  width: 100%;
}

.state-columns-list::before,
.state-columns-list::after {
  content: '';
  flex: 1;
}
</style>
