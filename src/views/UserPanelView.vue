<script setup lang="ts">
import useEmployee from '@/hooks/useEmployee';
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

const { employee, isLoading } = useEmployee('6315ea42fa367f5a01aa808b');
</script>

<template>
  <LoadingSpinner class="w-full" v-if="isLoading" />
  <TaskStateColumns
    v-else
    :tasks="employee?.takenTasks || []"
    :isInteractive="true"
  ></TaskStateColumns>
</template>

<style scoped lang="scss"></style>
