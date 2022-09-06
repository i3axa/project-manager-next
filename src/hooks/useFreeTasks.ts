import type ITask from '@/models/ITask';
import { ref, watch } from 'vue';
import useTasks from './useTasks';

export default function () {
  const { tasks } = useTasks();

  const isLoading = ref(true);

  let freeTasks = ref<ITask[]>([]);

  watch(tasks, () => {
    freeTasks.value = tasks.value.filter((task) => task.isFree === true);
    isLoading.value = false;
  });

  return { freeTasks, isLoading };
}
