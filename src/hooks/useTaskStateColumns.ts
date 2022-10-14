import type ITask from '@/models/ITask';
import { ref } from 'vue';
import {
  StateColumn,
  TaskInStateColumn,
  type IStateColumn,
  type ITaskInStateColumn,
} from '@/types/TaskStateColumn';
import { TaskState } from '@/types/API';

export default function (tasks: ITask[]) {
  const waitingTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === TaskState.WAITING)
    .map((task) => new TaskInStateColumn(task));

  const inProgressTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === TaskState.IN_PROGRESS)
    .map((task) => new TaskInStateColumn(task));

  const stopedTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === TaskState.STOPED)
    .map((task) => new TaskInStateColumn(task));

  const closedTasks: ITaskInStateColumn[] = tasks
    .filter((task) => task.state === TaskState.CLOSED)
    .map((task) => new TaskInStateColumn(task));

  const taskStateColumns = ref<IStateColumn[]>([
    new StateColumn({
      titleLocaleKey: 'dashboard.toDos',
      state: TaskState.WAITING,
      tasks: waitingTasks,
    }),
    new StateColumn({
      titleLocaleKey: 'dashboard.inProgress',
      state: TaskState.IN_PROGRESS,
      tasks: inProgressTasks,
    }),
    new StateColumn({
      titleLocaleKey: 'dashboard.review',
      state: TaskState.STOPED,
      tasks: stopedTasks,
    }),
    new StateColumn({
      titleLocaleKey: 'dashboard.done',
      state: TaskState.CLOSED,
      tasks: closedTasks,
    }),
  ]);

  return { taskStateColumns };
}
