import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import { onMounted, ref } from 'vue';

export default function () {
  const isLoading = ref(true);
  const tasks = ref<ITask[]>([]);

  onMounted(async () => {
    const tasksResponse = await TaskService.fetchTasks();

    tasks.value = tasksResponse.data.tasks;

    isLoading.value = false;
  });

  return { tasks, isLoading };
}
