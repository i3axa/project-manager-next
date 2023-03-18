import type ITask from '@/models/ITask';
import { ref } from 'vue';
import {
  StateColumn,
  TaskInStateColumn,
  type IStateColumn,
  type ITaskInStateColumn,
} from '@/utils/TaskStateColumn';
import { TaskState } from '@/types/API';

export default function (tasks: ITask[]) {
  const taskStateColumns = ref<IStateColumn[]>([]);

  const initialize = () => {
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

    taskStateColumns.value = [
      new StateColumn({
        titleLocaleKey: 'dashboard.WAITING',
        state: TaskState.WAITING,
        tasks: waitingTasks,
      }),
      new StateColumn({
        titleLocaleKey: 'dashboard.IN_PROGRESS',
        state: TaskState.IN_PROGRESS,
        tasks: inProgressTasks,
      }),
      new StateColumn({
        titleLocaleKey: 'dashboard.STOPED',
        state: TaskState.STOPED,
        tasks: stopedTasks,
      }),
      new StateColumn({
        titleLocaleKey: 'dashboard.CLOSED',
        state: TaskState.CLOSED,
        tasks: closedTasks,
      }),
    ];
  };

  initialize();

  return { taskStateColumns };
}
