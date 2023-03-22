import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { Id } from '@/types/API';
import { onMounted, ref, watch, type Ref } from 'vue';

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

    freeTasks.value = response.data.tasks;

    isLoading.value = false;
  };

  onMounted(async () => {
    if (currentProject.value) {
      isLoading.value = true;

      await fetch();
    }
  });

  watch(currentProject, async () => {
    isLoading.value = true;

    await fetch();
  });

  return { freeTasks, isLoading };
}
