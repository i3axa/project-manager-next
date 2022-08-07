<script setup lang="ts">
import useFreeTasks from '@/hooks/useFreeTasks';

const { tasks } = useFreeTasks();
</script>

<template>
  <base-draggable
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
    :list="tasks"
    itemKey="id"
    group="tasks"
    animation="150"
    force-fallback="true"
    filter=".ignore"
    handle=".handle"
  >
    <template #item="{ element }">
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
          <button class="btn-outline-dark ignore text-sm !p-2">
            <b-icon-pencil />
          </button>
          <h4 class="unselectable w-max !text-dark">
            {{ element.title }} ({{ element.difficulty }})
          </h4>
          <b-icon-arrows-move class="text-2xl" />
        </div>
        <div class="task-body">
          <p class="text-dark dark:text-light text-center">
            {{ element.description }}
          </p>
        </div>
      </div>
    </template>
  </base-draggable>
</template>

<style scoped lang="scss">
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
</style>
