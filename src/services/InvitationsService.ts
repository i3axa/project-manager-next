import { AuthAPIInstance } from '@/http';
import type IInvitation from '@/models/IInvitation';
import type { IInvitationRequest } from '@/models/requests/IInvitationRequest';
import type IInvitationResponse from '@/models/response/IInvitationResponse';
import type IInvitationsManyResponse from '@/models/response/IInvitationsManyResponse';
import type { Id, InvitationsQuery } from '@/types/API';

export interface PatchInvitationParams {
  id: Id;
  data: Pick<IInvitation, 'isResolved'>;
}

export default class InvitationsService {
  static async fetchInvitations(query?: InvitationsQuery) {
    const url = `/invitations`;

    return AuthAPIInstance.get<IInvitationsManyResponse>(url, {
      params: query,
    });
  }

  static async createInvitation(data: Omit<IInvitationRequest, 'isResolved'>) {
    const url = `/invitations`;

    return AuthAPIInstance.post<IInvitationResponse>(url, data);
  }

  static async patchInvitation({ id, data }: PatchInvitationParams) {
    const url = `/invitations/${id}`;

    return AuthAPIInstance.patch<IInvitationResponse>(url, data);
  }

  static async deleteInvitation(id: Id) {
    const url = `/invitations/${id}`;

    return AuthAPIInstance.delete(url);
  }
}
