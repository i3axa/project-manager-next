import type ITask from '@/models/ITask';
import { ref, watch } from 'vue';
import {
  StateColumn,
  TaskInStateColumn,
  type IStateColumn,
} from '@/utils/TaskStateColumn';
import { TaskState } from '@/types/API';
import type { MaybeRef } from '@vueuse/core';
import { getMaybeRefValue } from '@/utils';
import { useI18n } from 'vue-i18n';

export default function (tasks: MaybeRef<ITask[]>) {
  const taskStateColumns = ref<IStateColumn[]>([]);
  const { t } = useI18n();

  for (const state in TaskState) {
    taskStateColumns.value.push(
      new StateColumn({
        title: t(`dashboard.${state}`),
        state: state as TaskState,
        tasks: getMaybeRefValue(tasks)
          .filter((task) => task.state === state)
          .map((task) => new TaskInStateColumn(task)),
      })
    );
  }

  watch(tasks, (newTasks) => {
    taskStateColumns.value.forEach(
      (col) =>
        (col.tasks = getMaybeRefValue(newTasks)
          .filter((task) => task.state === col.state)
          .map((task) => new TaskInStateColumn(task)))
    );
  });

  return { taskStateColumns };
}
