<script setup lang="ts">
import { useRoute } from 'vue-router';
import useEmployee from '@/hooks/useEmployee';
import TaskStateColumns from '@/components/TaskStateColumns.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

const route = useRoute();
const { employee, isLoading } = useEmployee(route.params.id as string);

if (route.params.id === undefined) {
  throw new Error('Unknown id');
}
</script>

<template>
  <LoadingSpinner class="w-full" v-if="isLoading" />
  <TaskStateColumns
    v-else
    :tasks="employee?.takenTasks || []"
    :isInteractive="false"
  ></TaskStateColumns>
</template>

<style scoped lang="scss"></style>
