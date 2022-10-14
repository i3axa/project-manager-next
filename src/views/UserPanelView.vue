<script setup lang="ts">
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useEmployee from '@/hooks/useEmployee';
import useTasks from '@/hooks/useTasks';

const { employee } = useEmployee('63302e77f7dea990f6963453');

const { tasks, isLoading } = useTasks({ employee: employee.value?._id });
</script>

<template>
  <LoadingSpinner class="w-full" v-if="isLoading" />
  <TaskStateColumns
    v-else
    :employee="employee"
    :tasks="tasks"
    :isInteractive="true"
  ></TaskStateColumns>
</template>

<style scoped lang="scss"></style>
