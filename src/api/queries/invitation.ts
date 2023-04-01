import type IInvitation from '@/models/IInvitation';
import InvitationsService, {
  type PatchInvitationParams,
} from '@/services/InvitationsService';
import type { Id, InvitationsQuery } from '@/types/API';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';

export function useInvitations(
  queryKey: MaybeRef<[string, InvitationsQuery] | [string]> = ['invitations']
) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const invitationsResponse = await InvitationsService.fetchInvitations(
        queryKey[1]
      );

      return invitationsResponse.data.invitations;
    },
    initialData: [],
  });
}

export function useCreateInvitation(
  queryKey: MaybeRef<QueryKey> = ['invitations']
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Parameters<typeof InvitationsService.createInvitation>[0]
    ) => {
      const response = await InvitationsService.createInvitation(data);

      return response.data.invitation;
    },
    onSuccess: (data) => {
      const previousValue = queryClient.getQueryData<IInvitation[]>(queryKey);

      queryClient.setQueryData(queryKey, [...(previousValue || []), data]);
    },
  });
}

export function usePatchInvitation(queryKey?: MaybeRef<QueryKey>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PatchInvitationParams) => {
      const response = await InvitationsService.patchInvitation(params);

      return response.data.invitation;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: queryKey || ['invitations', variables.id],
      });

      const previousValue = queryClient.getQueryData<IInvitation>(
        queryKey || ['invitations', variables.id]
      );

      if (!previousValue) {
        return;
      }

      queryClient.setQueryData(queryKey || ['invitations', variables.id], {
        ...previousValue,
        ...variables.data,
      });

      return { previousValue };
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        queryKey || ['invitations', variables.id],
        context?.previousValue
      );
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey || ['invitations', variables.id],
      });
    },
  });
}

export function useDeleteInvitation(
  queryKey: MaybeRef<QueryKey> = ['invitations']
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Id) => InvitationsService.deleteInvitation(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<IInvitation[]>(queryKey);

      if (!previousValue) {
        return;
      }

      const newValue = previousValue.filter((i) => i._id !== id);

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
