import { AuthAPIInstance, FormAuthAPIInstance } from '@/http';
import type ITasksIdResponse from '@/models/response/ITasksIdResponse';
import type ITask from '@/models/ITask';
import type ITaskResponse from '@/models/response/ITaskResponse';

export default class TaskService {
  static async fetchTasks() {
    const url = '/tasks';

    return AuthAPIInstance.get<ITasksIdResponse>(url);
  }

  static async fetchFreeTasks() {
    const url = '/free-tasks';

    return AuthAPIInstance.get<ITasksIdResponse>(url);
  }

  static async fetchTaskById(id: string) {
    const url = `tasks/${id}`;

    return AuthAPIInstance.get<ITaskResponse>(url);
  }

  static async createTask(newTask: FormData) {
    const url = '/tasks';

    return FormAuthAPIInstance.post<ITaskResponse>(url, newTask);
  }

  static async patchTask(taskId: string, data: Partial<ITask>) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.patch<ITaskResponse>(url, data);
  }

  static async putTask(taskId: string, data: FormData) {
    const url = `/tasks/${taskId}`;

    return FormAuthAPIInstance.put<ITaskResponse>(url, data);
  }

  static async deleteTask(taskId: string) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.delete(url);
  }
}
