import type ITask from '@/models/ITask';
import { ref, watch } from 'vue';
import {
  TaskInStateColumn,
  TaskStateColumn,
  type ITaskStateColumn,
  type ITaskInStateColumn,
} from '@/types/TaskStateColumn';

export default function (tasks: ITask[]) {
  const waitingTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === 'waiting')
    .map((task) => new TaskInStateColumn(task));

  const inProgressTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === 'in progress')
    .map((task) => new TaskInStateColumn(task));

  const stopedTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === 'stoped')
    .map((task) => new TaskInStateColumn(task));

  const closedTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === 'closed')
    .map((task) => new TaskInStateColumn(task));

  const taskStateColumns = ref<ITaskStateColumn[]>([
    new TaskStateColumn({
      titleLocaleKey: 'dashboard.toDos',
      state: 'waiting',
      tasks: waitingTasks,
    }),
    new TaskStateColumn({
      titleLocaleKey: 'dashboard.inProgress',
      state: 'in progress',
      tasks: inProgressTasks,
    }),
    new TaskStateColumn({
      titleLocaleKey: 'dashboard.review',
      state: 'stoped',
      tasks: stopedTasks,
    }),
    new TaskStateColumn({
      titleLocaleKey: 'dashboard.done',
      state: 'closed',
      tasks: closedTasks,
    }),
  ]);

  return { taskStateColumns };
}
