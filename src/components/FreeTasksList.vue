<script setup lang="ts">
import useFreeTasks from '@/hooks/useFreeTasks';
import DropDown from '@/components/UI/DropDown.vue';
import type ITask from '@/models/ITask';
import { MenuItem } from '@headlessui/vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

interface IProps {
  tasks: ITask[];
}

interface IEmits {
  (eventName: 'taskDelete', taskIndex: number): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<template>
  <base-draggable
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    :list="tasks"
    itemKey="id"
    group="tasks"
    animation="150"
    force-fallback="true"
    filter=".ignore"
    handle=".handle"
  >
    <template #item="{ element, index }: { element: ITask, index: number }">
      <div
        class="task border-4 rounded-3xl shadow-md"
        :style="{
          borderColor: `var(--difficulty-${element.difficulty})`,
        }"
      >
        <div
          class="task-header handle rounded-t-2xl !border-none"
          :style="{
            backgroundColor: `var(--difficulty-${element.difficulty})`,
          }"
        >
          <h4 class="unselectable w-max !text-dark">
            {{ element.title }} ({{ element.difficulty }})
          </h4>
          <DropDown class="ignore">
            <template #title>
              <b-icon-three-dots class="text-2xl" />
            </template>
            <template #items>
              <MenuItem
                v-slot="{ active }"
                @click="$router.push(`taskUpdate/${element._id}`)"
              >
                <div
                  class="drop-down-item unselectable rounded-t-2xl"
                  :class="[
                    active
                      ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200 '
                      : 'text-gray-900 dark:text-gray-400',
                  ]"
                >
                  <b-icon-pencil /> {{ $t('dashboard.edit') }}
                </div>
              </MenuItem>
              <MenuItem v-slot="{ active }" @click="$emit('taskDelete', index)">
                <div
                  class="drop-down-item unselectable rounded-b-2xl"
                  :class="[
                    active
                      ? 'bg-gray-100 dark:bg-gray-600 text-error/70'
                      : 'text-error',
                  ]"
                >
                  <b-icon-trash-2 /> {{ $t('dashboard.delete') }}
                </div>
              </MenuItem>
            </template>
          </DropDown>
        </div>
        <div class="task-body">
          <p
            class="text-dark dark:text-light text-center"
            v-html="element.description"
          ></p>
        </div>
      </div>
    </template>
  </base-draggable>
</template>

<style scoped lang="scss">
.sortable-chosen > .task-body {
  font-size: 0;
}

.task {
  margin-top: 0.5rem;
}

.task-body {
  padding: 10px;
}

.task-header {
  padding: 10px;
  border-width: 1px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  cursor: move;
}

.dark .task {
  filter: brightness(0.8);
}

.drop-down-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>
