import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { Id, TasksQuery } from '@/types/API';
import { TasksConverter } from '@/types/API/ResponseToModelConverter';
import { onMounted, ref } from 'vue';

export default function (tasksQuery?: TasksQuery) {
  const isLoading = ref(true);
  const tasks = ref<ITask[]>([]);

  onMounted(async () => {
    const response = await TaskService.fetchTasks(tasksQuery);

    tasks.value = await TasksConverter.getTasksFromIds(response);

    isLoading.value = false;
  });

  return { tasks, isLoading };
}
