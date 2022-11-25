<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core';

interface IProps {
  type?: string;
  validation: BaseValidation;
  placeholder?: string;
}

interface IEmits {
  (eventName: 'update:validationModel', value: string): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onChange = (event: Event) => {
  emit('update:validationModel', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="outer">
    <input
      class="form-control w-full"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="validation.$model"
      @change="onChange"
      :class="{
        'is-invalid': validation.$error,
        'is-valid': !validation.$invalid,
        'animate-shake': validation.$externalResults.length > 0,
      }"
    />
    <div
      class="ml-1 text-sm text-error"
      v-for="error in validation.$errors"
      :key="error.$uid"
    >
      {{ error.$message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
