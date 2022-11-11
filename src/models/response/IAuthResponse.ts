import type { Id, Role } from '@/types/API';

export default interface IAuthResponse {
  accessToken: string;
  user: {
    id: Id;
    isActivated: boolean;
    roles: Role[];
  };
}
