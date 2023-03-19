import type IInvitation from '@/models/IInvitation';
import InvitationsService from '@/services/InvitationsService';
import type { InvitationsQuery } from '@/types/API';
import { InvitationsConverter } from '@/utils/ResponseToModelConverter';
import { onMounted, ref } from 'vue';

export default function (query: InvitationsQuery) {
  const invitations = ref<IInvitation[]>([]);
  const isLoading = ref(true);

  onMounted(async () => {
    const invitationsResponse = await InvitationsService.fetchInvitations(
      query
    );

    for (const invitation of invitationsResponse.data.invitations) {
      invitations.value.push(
        await InvitationsConverter.getInvitation(invitation)
      );
    }

    isLoading.value = false;
  });

  return {
    invitations,
    isLoading,
  };
}
