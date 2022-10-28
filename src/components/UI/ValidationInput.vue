<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core';

interface IProps {
  type?: string;
  validation: BaseValidation;
  placeholder?: string;
}

defineProps<IProps>();
</script>

<template>
  <div class="outer">
    <input
      class="form-control w-full"
      :type="type || 'text'"
      :placeholder="placeholder"
      v-model="validation.$model"
      :class="{
        'is-invalid': validation.$error,
        'is-valid': !validation.$invalid,
        'animate-shake': validation.$externalResults.length > 0,
      }"
    />
    <div class="ml-1 text-sm text-error" v-for="error in validation.$errors">
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
