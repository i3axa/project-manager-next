<script setup lang="ts">
import { ref, watch } from 'vue';

interface IProps {
  value: unknown;
  model: unknown;
  id: string;
}

interface IEmits {
  (eventName: 'input', value: unknown): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="focus:ring-secondary dark:bg-gray-700 h-4 w-4 text-primary border-gray-300"
      :value="value"
      v-model="model"
      @input="$emit('input', value)"
    />
    <label
      :for="id"
      class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-100"
    >
      <slot></slot>
    </label>
  </div>
</template>
