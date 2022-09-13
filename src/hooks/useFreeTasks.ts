import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { onMounted, ref } from 'vue';

export default function () {
  const freeTasks = ref<ITask[]>([]);
  const isLoading = ref(true);

  onMounted(async () => {
    const tasksResponse = await TaskService.fetchFreeTasks();

    for (const id of tasksResponse.data.tasks) {
      const response = await TaskService.fetchTaskById(id);

      freeTasks.value.push(response.data.task);
    }

    isLoading.value = false;
  });

  return { freeTasks, isLoading };
}
