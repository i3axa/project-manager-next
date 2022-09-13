import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { onMounted, ref } from 'vue';

export default function () {
  const isLoading = ref(true);
  const tasks = ref<ITask[]>([]);

  onMounted(async () => {
    const tasksResponse = await TaskService.fetchTasks();

    for (const id of tasksResponse.data.tasks) {
      const response = await TaskService.fetchTaskById(id);

      tasks.value.push(response.data.task);
    }

    isLoading.value = false;
  });

  return { tasks, isLoading };
}
