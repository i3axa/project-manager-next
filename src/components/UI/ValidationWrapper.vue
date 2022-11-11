<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

interface IProps {
  type?: string;
  errors: ErrorObject[];
  placeholder?: string;
}

defineProps<IProps>();
</script>

<template>
  <div class="outer">
    <slot></slot>
    <div class="ml-1 text-sm text-error" v-for="error in errors">
      {{ error.$message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
