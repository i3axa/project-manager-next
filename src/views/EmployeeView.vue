<script setup lang="ts">
import { useRoute } from 'vue-router';
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import useTasks from '@/hooks/useTasks';

const route = useRoute();
if (route.params.id === undefined) {
  throw new Error('Unknown id');
}

const employee = route.params.id as string;

const { tasks, isLoading } = useTasks({ employee });
</script>

<template>
  <LoadingSpinner class="w-full" v-if="isLoading" />
  <TaskStateColumns
    v-else
    :tasks="tasks"
    :isInteractive="false"
  ></TaskStateColumns>
</template>

<style scoped lang="scss"></style>
