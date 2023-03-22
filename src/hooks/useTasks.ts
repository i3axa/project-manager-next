import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { TasksQuery } from '@/types/API';
import { onMounted, ref } from 'vue';

export default function (tasksQuery?: TasksQuery) {
  const isLoading = ref(true);
  const tasks = ref<ITask[]>([]);

  onMounted(async () => {
    const response = await TaskService.fetchTasks(tasksQuery);

    tasks.value = response.data.tasks;

    isLoading.value = false;
  });

  return { tasks, isLoading };
}
