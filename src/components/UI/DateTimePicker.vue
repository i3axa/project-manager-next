<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface IProps {
  placeholder?: string;
  modelValue?: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: string): void;
}

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const input = ref<HTMLInputElement>();

const updateInput = (event: Event) => {
  const element = event.target as HTMLInputElement;

  emit('update:modelValue', element.value);
};

const onFocusIn = () => {
  input.value!.type = 'datetime-local';
};

const onFocusOut = () => {
  if (props.modelValue) {
    return;
  }

  input.value!.type = 'text';
};

onMounted(() => {
  if (input.value && props.modelValue) {
    input.value.value = new Date(props.modelValue).toLocaleString();
  }
});
</script>

<template>
  <input
    class="form-control"
    type="text"
    ref="input"
    :placeholder="placeholder"
    v-model="modelValue"
    @input="updateInput"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  />
</template>
