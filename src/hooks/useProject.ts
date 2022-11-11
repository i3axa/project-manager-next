import type IProject from '@/models/IProject';
import ProjectService from '@/services/ProjectService';
import type { Id } from '@/types/API';
import { onMounted, ref } from 'vue';

export default function useProject(id: Id) {
  const isLoading = ref(true);
  const project = ref<IProject>();

  onMounted(async () => {
    const projectsResponse = await ProjectService.fetchProjectById(id);

    project.value = projectsResponse.data.project;

    isLoading.value = false;
  });

  return { project, isLoading };
}
