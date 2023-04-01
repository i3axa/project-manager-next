import type ITask from '@/models/ITask';
import TaskService, {
  type CreateTaskParams,
  type PatchTaskParams,
  type PutTaskParams,
} from '@/services/TaskService';
import type { Id, TasksQuery } from '@/types/API';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';

export function useTasks(
  queryKey: MaybeRef<[string, TasksQuery] | [string]> = ['tasks'],
  options?: Omit<
    UseQueryOptions<ITask[], unknown, ITask[], [string, TasksQuery] | [string]>,
    'queryKey' | 'queryClient'
  >
) {
  return useQuery({
    ...options,
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await TaskService.fetchTasks(queryKey[1]);

      return response.data.tasks;
    },
    initialData: [],
  });
}

export function useTask(queryKey: MaybeRef<[string, Id]>) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await TaskService.fetchTaskById(queryKey[1]);

      return response.data.task;
    },
  });
}

export function useDeleteTask(queryKey: MaybeRef<QueryKey> = ['tasks']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Id) => TaskService.deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<ITask[]>(queryKey);

      if (!previousValue) {
        return;
      }

      const newValue = previousValue.filter((t) => t._id !== id);

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

export function useCreateTask(queryKey: QueryKey = ['tasks']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateTaskParams) => {
      const response = await TaskService.createTask(params);

      return response.data.task;
    },
    onSuccess: (data) => {
      const previousValue = queryClient.getQueryData<ITask[]>(queryKey);

      queryClient.setQueryData(queryKey, [...(previousValue || []), data]);
    },
  });
}

export function usePutTask(queryKey?: MaybeRef<QueryKey>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PutTaskParams) => {
      const response = await TaskService.putTask(params);

      return response.data.task;
    },
    onSuccess: (data) => {
      const previousValue = queryClient.getQueryData<ITask>(
        queryKey || ['tasks', data._id]
      );

      queryClient.setQueryData(queryKey || ['tasks', data._id], {
        ...previousValue,
        ...data,
      });
    },
  });
}

export function usePatchTask(queryKey?: MaybeRef<QueryKey>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PatchTaskParams) => {
      const response = await TaskService.patchTask(params);

      return response.data.task;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<ITask[]>(
        queryKey || ['tasks']
      );

      if (!previousValue) {
        return;
      }

      const index = previousValue.findIndex((t) => t._id === variables.id);

      if (index === -1) {
        return;
      }

      const newTask = { ...previousValue[index], ...variables.data };

      const newValue = [...previousValue];
      newValue[index] = newTask;

      queryClient.setQueryData(queryKey || ['tasks'], newValue);

      return { previousValue };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey || ['tasks'], context?.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey || ['tasks'],
      });
    },
  });
}
