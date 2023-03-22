import type IInvitation from '@/models/IInvitation';
import InvitationsService from '@/services/InvitationsService';
import type { InvitationsQuery } from '@/types/API';
import { onMounted, ref } from 'vue';

export default function (query: InvitationsQuery) {
  const invitations = ref<IInvitation[]>([]);
  const isLoading = ref(true);

  onMounted(async () => {
    const invitationsResponse = await InvitationsService.fetchInvitations(
      query
    );

    invitations.value = invitationsResponse.data.invitations;

    isLoading.value = false;
  });

  return {
    invitations,
    isLoading,
  };
}
