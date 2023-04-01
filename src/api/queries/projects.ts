import type IProject from '@/models/IProject';
import EmployeesService from '@/services/EmployeesService';
import ProjectService, {
  type PatchProjectParams,
} from '@/services/ProjectService';
import { EmployeeSpeciality, type Id, type ProjectsQuery } from '@/types/API';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';

export function useProject(queryKey: MaybeRef<[string, Id]>) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await ProjectService.fetchProjectById(queryKey[1]);

      return response.data.project;
    },
  });
}

export function useProjects(
  queryKey: MaybeRef<[string, ProjectsQuery] | [string]> = ['projects']
) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await ProjectService.fetchProjects(queryKey[1]);

      return response.data.projects;
    },
    initialData: [],
  });
}

export function useDeleteProject(queryKey: MaybeRef<QueryKey> = ['projects']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Id) => ProjectService.deleteProject(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<IProject[]>(queryKey);

      if (!previousValue) {
        return;
      }

      const newValue = previousValue.filter((p) => p._id !== id);

      queryClient.setQueryData(queryKey, newValue);

      return { previousValue };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useCreateProject(queryKey: MaybeRef<QueryKey> = ['projects']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Omit<IProject, '_id'>) => {
      const response = await ProjectService.createProject(params);

      await EmployeesService.createEmployee({
        project: response.data.project._id,
        speciality: EmployeeSpeciality.MANAGER,
      });

      return response.data.project;
    },
    onSuccess: (data) => {
      const previousValue = queryClient.getQueryData<IProject[]>(queryKey);

      queryClient.setQueryData(queryKey, [...(previousValue || []), data]);
    },
  });
}

export function usePatchProject(queryKey?: MaybeRef<QueryKey>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PatchProjectParams) => {
      const response = await ProjectService.patchProject(params);

      return response.data.project;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<IProject>(
        queryKey || ['projects', variables.id]
      );

      if (!previousValue) {
        return;
      }

      queryClient.setQueryData(queryKey || ['projects', variables.id], {
        ...previousValue,
        ...variables.data,
      });

      return { previousValue };
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        queryKey || ['projects', variables.id],
        context?.previousValue
      );
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey || ['projects', variables.id],
      });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onSuccess: (data) => {
      const previousProjects = queryClient.getQueryData<IProject[]>([
        'projects',
      ]);

      if (!previousProjects) {
        return;
      }

      const index = previousProjects.findIndex((p) => p._id === data._id);

      const newProjects = [...previousProjects];
      newProjects[index] = data;

      queryClient.setQueryData(['projects'], [...previousProjects]);
    },
  });
}
