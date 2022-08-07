<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FreeTasksList from '@/components/FreeTasksList.vue';
</script>

<template>
  <div class="admin-panel bg-white dark:bg-slate-800 dark:bg-opacity-50">
    <h2>{{ $t('dashboard.employees') }}</h2>
    <EmployeesList></EmployeesList>

    <h2>{{ $t('dashboard.tasks') }}</h2>
    <FreeTasksList></FreeTasksList>
  </div>
</template>

<style scoped lang="scss">
h2 {
  align-self: center;
}

.admin-panel {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 30px;
  border-radius: 65px;
}
</style>
