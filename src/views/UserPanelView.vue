<script setup lang="ts">
import useEmployee from '@/hooks/useEmployee';
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

const { employee, isLoading } = useEmployee('6322fc74acd5fa7458f2d3f6');
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
