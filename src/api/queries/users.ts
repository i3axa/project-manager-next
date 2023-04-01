import UserService, {
  type PatchUserParams,
  type PutPasswordParams,
} from '@/services/UserService';
import type { Id, UsersQuery } from '@/types/API';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';

export function useUser(queryKey: MaybeRef<[string, Id]>) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await UserService.getUser(queryKey[1]);

      return response.data.user;
    },
  });
}

export function useUsers(
  queryKey: MaybeRef<[string, UsersQuery] | [string]> = ['users']
) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await UserService.getUsers(queryKey[1]);

      return response.data.users;
    },
    initialData: [],
  });
}

export function usePatchUser(queryKey: MaybeRef<[string, Id]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PatchUserParams) => {
      const response = await UserService.patchUser(params);

      return response.data.user;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey || ['users', data._id], data);
    },
  });
}

export function usePutPassword() {
  return useMutation({
    mutationFn: (params: PutPasswordParams) => UserService.putPassword(params),
  });
}
