import { AuthAPIInstance } from '@/http';
import type IProject from '@/models/IProject';
import type IProjectResponse from '@/models/response/IProjectResponse';
import type IProjectsIdResponse from '@/models/response/IProjectsIdResponse';
import type { Id, ProjectsQuery } from '@/types/API';

export default class ProjectService {
  static async fetchProjectById(id: Id) {
    const url = `/projects/${id}`;

    return AuthAPIInstance.get<IProjectResponse>(url);
  }

  static async fetchProjects(query?: ProjectsQuery) {
    const url = `/projects`;

    return AuthAPIInstance.get<IProjectsIdResponse>(url, { params: query });
  }

  static async patchProject(id: Id, data: Partial<IProject>) {
    const url = `/projects/${id}`;

    return AuthAPIInstance.patch<IProjectResponse>(url, data);
  }

  static async createProject(data: Omit<IProject, '_id'>) {
    const url = `/projects`;

    return AuthAPIInstance.post<IProjectResponse>(url, data);
  }

  static async deleteProject(id: Id) {
    const url = `/projects/${id}`;

    return AuthAPIInstance.delete<IProjectResponse>(url);
  }
}
