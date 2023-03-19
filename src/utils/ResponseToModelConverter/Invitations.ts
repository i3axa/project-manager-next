import type { IInvitationDto } from '@/models/dto/IInvitationDto';
import UserService from '@/services/UserService';
import type IInvitation from '@/models/IInvitation';
import ProjectService from '@/services/ProjectService';

export async function getInvitation(dto: IInvitationDto): Promise<IInvitation> {
  const [user, project] = await Promise.all([
    UserService.getUser(dto.user),
    ProjectService.fetchProjectById(dto.project),
  ]);

  return {
    ...dto,
    user: user.data.user,
    project: project.data.project,
  };
}

export default { getInvitation };
