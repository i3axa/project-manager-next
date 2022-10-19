import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { Id } from '@/types/API';
import { TasksConverter } from '@/types/API/ResponseToModelConverter';
import { ref, watch, type Ref } from 'vue';

export default function (currentProject: Ref<Id | undefined>) {
  const isLoading = ref(true);
  const freeTasks = ref<ITask[]>([]);

  const fetch = async () => {
    if (currentProject.value === undefined) {
      return;
    }

    const response = await TaskService.fetchTasks({
      project: currentProject.value,
      isFree: '1',
    });

    freeTasks.value = await TasksConverter.getTasksFromIds(response);

    isLoading.value = false;
  };

  watch(currentProject, async () => {
    isLoading.value = true;
    await fetch();
  });

  return { freeTasks, isLoading };
}
