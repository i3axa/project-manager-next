import type ITask from '@/models/ITask';
import type ITasksIdResponse from '@/models/response/ITasksIdResponse';
import TaskService from '@/services/TaskService';
import type { AxiosResponse } from 'axios';

export async function getTasksFromIds(
  response: AxiosResponse<ITasksIdResponse>
) {
  const tasks: ITask[] = [];

  for (const id of response.data.tasks) {
    const taskResponse = await TaskService.fetchTaskById(id);

    tasks.push(taskResponse.data.task);
  }

  return tasks;
}

export default { getTasksFromIds };
