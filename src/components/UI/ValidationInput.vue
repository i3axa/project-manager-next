<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core';

interface IProps {
  type?: string;
  validation: BaseValidation;
  placeholderLocaleKey: string;
}

defineProps<IProps>();
</script>

<template>
  <div class="form-group">
    <input
      class="form-control"
      :type="type || 'text'"
      :placeholder="$t(placeholderLocaleKey)"
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
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-control {
  width: 100%;
}
</style>
