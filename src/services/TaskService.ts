import { AuthAPIInstance, FormAuthAPIInstance } from '@/http';
import type ITasksManyResponse from '@/models/response/ITasksManyResponse';
import type ITask from '@/models/ITask';
import type ITaskResponse from '@/models/response/ITaskResponse';
import type { Id, TasksQuery } from '@/types/API';

export default class TaskService {
  static async fetchTasks(query?: TasksQuery) {
    const url = '/tasks';

    return AuthAPIInstance.get<ITasksManyResponse>(url, {
      params: query,
    });
  }

  static async fetchTaskById(id: Id) {
    const url = `tasks/${id}`;

    return AuthAPIInstance.get<ITaskResponse>(url);
  }

  static async createTask(newTask: FormData) {
    const url = '/tasks';

    return FormAuthAPIInstance.post<ITaskResponse>(url, newTask);
  }

  static async patchTask(taskId: Id, data: Partial<ITask>) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.patch<ITaskResponse>(url, data);
  }

  static async putTask(taskId: Id, data: FormData) {
    const url = `/tasks/${taskId}`;

    return FormAuthAPIInstance.put<ITaskResponse>(url, data);
  }

  static async deleteTask(taskId: Id) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.delete(url);
  }
}
