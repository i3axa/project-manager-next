<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

interface IProps {
  placeholder?: string;
  modelValue: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: string): void;
}

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const input = ref<HTMLInputElement>();

const inputValue = computed(() => {
  if (!input.value) {
    return '';
  }

  if (props.modelValue.length === 0) {
    return '';
  }

  console.log(props.modelValue, input.value.type);

  const date = new Date(props.modelValue);

  if (input.value.type === 'text') {
    return date.toLocaleString();
  }

  const z = date.getTimezoneOffset() * 60 * 1000;
  const local = new Date(date.valueOf() - z);

  return local.toISOString().slice(0, 16);
});

const updateInput = (event: Event) => {
  const element = event.target as HTMLInputElement;

  emit('update:modelValue', new Date(element.value).toISOString());
};

const onFocusIn = () => {
  if (!input.value) {
    return;
  }

  input.value.type = 'datetime-local';
};

const onFocusOut = () => {
  if (!input.value) {
    return;
  }

  input.value.type = 'text';
  input.value.value = inputValue.effect.run() ?? '';
};
</script>

<template>
  <input
    class="form-control"
    type="text"
    ref="input"
    :placeholder="placeholder"
    :value="inputValue"
    @input="updateInput"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  />
</template>
