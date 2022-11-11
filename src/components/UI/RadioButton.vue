<script setup lang="ts">
interface IProps {
  value: number | string;
  modelValue: unknown;
  id: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: number | string): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const updateInput = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const parsedNumber = Number.parseInt(element.value);

  let result: number | string;

  if (Number.isNaN(parsedNumber)) {
    result = element.value;
  } else {
    result = parsedNumber;
  }

  emit('update:modelValue', result);
};
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="focus:ring-secondary dark:bg-gray-700 h-4 w-4 text-primary border-gray-300"
      :value="value"
      v-model="modelValue"
      @input="updateInput"
    />
    <label
      :for="id"
      class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-100"
    >
      <slot></slot>
    </label>
  </div>
</template>
