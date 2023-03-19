import { AuthAPIInstance } from '@/http';
import type { IInvitationDto } from '@/models/dto/IInvitationDto';
import type IInvitationResponse from '@/models/response/IInvitationResponse';
import type IInvitationsManyResponse from '@/models/response/IInvitationsManyResponse';
import type { Id, InvitationsQuery } from '@/types/API';

export default class InvitationsService {
  static async fetchInvitations(query: InvitationsQuery) {
    const url = `/invitations`;

    return AuthAPIInstance.get<IInvitationsManyResponse>(url, {
      params: query,
    });
  }

  static async createInvitation(
    data: Omit<IInvitationDto, '_id' | 'isResolved'>
  ) {
    const url = `/invitations`;

    return AuthAPIInstance.post<IInvitationResponse>(url, data);
  }

  static async patchInvitation(id: Id, data: { isResolved: boolean }) {
    const url = `/invitations/${id}`;

    return AuthAPIInstance.patch<IInvitationResponse>(url, data);
  }

  static async deleteInvitation(id: Id) {
    const url = `/invitations/${id}`;

    return AuthAPIInstance.delete(url);
  }
}
