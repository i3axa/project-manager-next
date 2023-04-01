import { AuthAPIInstance } from '@/http';
import type IProject from '@/models/IProject';
import type IProjectResponse from '@/models/response/IProjectResponse';
import type IProjectsManyResponse from '@/models/response/IProjectsManyResponse';
import type { Id, ProjectsQuery } from '@/types/API';

export interface PatchProjectParams {
  id: Id;
  data: Partial<Omit<IProject, '_id'>>;
}

export default class ProjectService {
  static async fetchProjectById(id: Id) {
    const url = `/projects/${id}`;

    return AuthAPIInstance.get<IProjectResponse>(url);
  }

  static async fetchProjects(query?: ProjectsQuery) {
    const url = `/projects`;

    return AuthAPIInstance.get<IProjectsManyResponse>(url, { params: query });
  }

  static async patchProject({ id, data }: PatchProjectParams) {
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
