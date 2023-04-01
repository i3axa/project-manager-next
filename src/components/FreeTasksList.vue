<script setup lang="ts">
import type ITask from '@/models/ITask';
import FreeTaskEditDropdown from '@/components/FreeTaskEditDropdown.vue';
import Draggable from 'vuedraggable';

interface IProps {
  tasks: ITask[];
}

interface IEmits {
  (eventName: 'taskDelete', taskIndex: number): void;
  (eventName: 'taskAdd', newIndex: number): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<template>
  <draggable
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    :list="tasks"
    :itemKey="(task: ITask) => task._id"
    group="tasks"
    animation="150"
    filter=".ignore"
    handle=".handle"
    force-fallback="true"
    @add="$emit('taskAdd', $event.newIndex)"
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
          <div class="text-lg font-semibold unselectable w-max !text-dark">
            {{ element.title }} ({{ element.difficulty }})
          </div>
          <FreeTaskEditDropdown
            class="ignore"
            :task-id="element._id"
            @taskDelete="$emit('taskDelete', index)"
          />
        </div>
        <div class="task-body">
          <p
            class="text-dark dark:text-light text-center"
            v-html="element.description"
          ></p>
        </div>
      </div>
    </template>
  </draggable>
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
</style>
