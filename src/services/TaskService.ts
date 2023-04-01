import { AuthAPIInstance, FormAuthAPIInstance } from '@/http';
import type ITasksManyResponse from '@/models/response/ITasksManyResponse';
import type ITask from '@/models/ITask';
import type ITaskResponse from '@/models/response/ITaskResponse';
import type { Id, TasksQuery } from '@/types/API';

export interface CreateTaskParams {
  data: Partial<ITask>;
  files: File[];
}

export interface PutTaskParams {
  id: Id;
  data: Partial<ITask>;
  files: File[];
}

export interface PatchTaskParams {
  id: Id;
  data: Partial<ITask>;
}

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

  static async createTask({ data, files }: CreateTaskParams) {
    const url = '/tasks';

    const formData = new FormData();

    for (const key in data) {
      const safeKey = key as keyof ITask;

      formData.append(key, data[safeKey] as string);
    }

    files.forEach((file) => {
      formData.append('files', file);
    });

    return FormAuthAPIInstance.post<ITaskResponse>(url, formData);
  }

  static async patchTask({ id, data }: PatchTaskParams) {
    const url = `/tasks/${id}`;

    return AuthAPIInstance.patch<ITaskResponse>(url, data);
  }

  static async putTask({ id, data, files }: PutTaskParams) {
    const url = `/tasks/${id}`;

    const formData = new FormData();

    for (const key in data) {
      const safeKey = key as keyof ITask;

      formData.append(key, data[safeKey] as string);
    }

    files.forEach((file) => {
      formData.append('files', file);
    });

    return FormAuthAPIInstance.put<ITaskResponse>(url, formData);
  }

  static async deleteTask(taskId: Id) {
    const url = `/tasks/${taskId}`;

    return AuthAPIInstance.delete(url);
  }
}
