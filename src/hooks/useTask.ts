import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { Id, TasksQuery } from '@/types/API';
import { TasksConverter } from '@/types/API/ResponseToModelConverter';
import { onMounted, ref } from 'vue';

export default function (id: Id) {
  const isLoading = ref(true);
  const task = ref<ITask>();

  onMounted(async () => {
    const response = await TaskService.fetchTaskById(id);

    task.value = response.data.task;

    isLoading.value = false;
  });

  return { task, isLoading };
}
