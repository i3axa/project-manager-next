import { AuthAPIInstance, FormAuthAPIInstance } from '@/http';
import type ITasksResponse from '@/models/response/ITasksResponse';
import type ITask from '@/models/ITask';
import type ITaskResponse from '@/models/response/ITaskResponse';

export default class TaskService {
  static async fetchTasks() {
    const url = '/tasks';

    return AuthAPIInstance.get<ITasksResponse>(url);
  }

  static async createTask(newTask: FormData) {
    const url = '/tasks';

    return FormAuthAPIInstance.post(url, newTask);
  }

  static async patchTask(taskId: string, data: Partial<ITask>) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.patch(url, data);
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
