import type IProject from '@/models/IProject';
import ProjectService from '@/services/ProjectService';
import type { ProjectsQuery } from '@/types/API';
import { onMounted, ref } from 'vue';

export default function useProjects(query?: ProjectsQuery) {
  const isLoading = ref(true);
  const projects = ref<IProject[]>([]);

  onMounted(async () => {
    const projectsResponse = await ProjectService.fetchProjects(query);

    projects.value = projectsResponse.data.projects;

    isLoading.value = false;
  });

  return { projects, isLoading };
}
