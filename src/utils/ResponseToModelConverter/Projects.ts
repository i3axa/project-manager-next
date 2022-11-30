import type IProject from '@/models/IProject';
import type IProjectsIdResponse from '@/models/response/IProjectsIdResponse';
import type { AxiosResponse } from 'axios';
import ProjectService from '@/services/ProjectService';

export async function getProjectsFromIds(
  response: AxiosResponse<IProjectsIdResponse>
) {
  const ids = response.data.projects;

  const projects: IProject[] = [];

  for (const id of ids) {
    const projectResponse = await ProjectService.fetchProjectById(id);

    projects.push(projectResponse.data.project);
  }

  return projects;
}

export default { getProjectsFromIds };
