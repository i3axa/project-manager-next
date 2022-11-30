<script setup lang="ts">
import { useVModel } from '@vueuse/core';

interface IProps {
  value: number | string;
  modelValue: unknown;
  id: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: number | string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="focus:ring-secondary dark:bg-gray-700 h-4 w-4 text-primary border-gray-300"
      :value="value"
      v-model="vModel"
    />
    <label
      :for="id"
      class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-100"
    >
      <slot></slot>
    </label>
  </div>
</template>
