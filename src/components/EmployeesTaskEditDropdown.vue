<script setup lang="ts">
import DropDown from '@/components/UI/DropDown.vue';
import { MenuItem } from '@headlessui/vue';

interface IProps {
  taskId: string;
}

interface IEmits {
  (eventName: 'taskDelete'): void;
  (eventName: 'taskRemove'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<template>
  <DropDown>
    <template #title>
      <b-icon-three-dots class="text-2xl" />
    </template>
    <template #items>
      <MenuItem
        v-slot="{ active }"
        @click="$router.push(`taskUpdate/${taskId}`)"
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
      <MenuItem v-slot="{ active }" @click="$emit('taskRemove')">
        <div
          class="drop-down-item unselectable"
          :class="[
            active
              ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200 '
              : 'text-gray-900 dark:text-gray-400',
          ]"
        >
          <b-icon-x-lg /> {{ $t('dashboard.remove') }}
        </div>
      </MenuItem>
      <MenuItem v-slot="{ active }" @click="$emit('taskDelete')">
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
</template>

<style scoped lang="scss">
.drop-down-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>
